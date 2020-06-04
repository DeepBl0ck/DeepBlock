'use strict';

const fs = require('fs');
const fsp = require('fs').promises;
const tf = require("@tensorflow/tfjs-node");
const models = require("../models");
const project_file = "deep_neural_network_model.json"
const responseHandler = require('@utils/responseHandler');

module.exports = {
  loadModelOfProject(req, res) {
    models.User.findOne({
      include: [{
        model: models.Project,
        where: {
          id: req.params.project_id
        }
      }],
      where: {
        id: req.session.userID
      }
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "잘못 된 접근입니다")
        } else {
          let proj_path = user.dataValues.Projects[0].projectPath;
          let proj = JSON.parse(fs.readFileSync(`${proj_path}/${project_file}`).toString());

          responseHandler.custom(res, 200, proj);
        }
      })
      .catch(() => {
        responseHandler.fail(res, 500, "처리 실패");
      })
  },

  // Run 5 per second when user see board-page
  updateModel(req, res) {
    models.User.findOne({
      include: [{
        model: models.Project,
        where: {
          id: req.params.project_id
        }
      }],
      where: {
        id: req.session.userID
      }
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "잘못 된 접근입니다")
        } else {
          let model = JSON.stringify(req.body);
          let proj = `${user.dataValues.Projects[0].projectPath}/${project_file}`;

          fs.open(proj, 'w', (function (err, file_id) {
            if (err) throw err;
            fs.writeSync(file_id, model, 0, model.length, null);
            fs.closeSync(file_id);
          }));

          responseHandler.success(res, 200, "저장 성공");
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      })
  },

  trainResult(req, res) {
    models.Project.findOne({
      where: {
        userID: req.session.userID,
        id: req.params.project_id
      }
    })
      .then((project) => {
        let history_path = `${project.dataValues.projectPath}/result/train_history.json`
        let history_backup_path = `${project.dataValues.projectPath}/result/train_history_tmp.json`

        try {
          fs.accessSync(`${history_backup_path}`, fs.F_OK)
          const train_history_json = JSON.parse(fs.readFileSync(history_backup_path).toString());
          responseHandler.custom(res, 200, train_history_json);
        } catch{
          try {
            fs.accessSync(`${history_path}`, fs.F_OK)
            const train_history_json = JSON.parse(fs.readFileSync(history_path).toString());
            responseHandler.custom(res, 200, train_history_json);
          } catch{
            responseHandler.fail(res, 403, '결과 없음');
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      })
  },

  testResult(req, res) {
    models.Project.findOne({
      include: [{
        model: models.Test,
      }],
      where: {
        userID: req.session.userID,
        id: req.params.project_id
      }
    })
      .then(async function (project) {
        project = project.dataValues;
        if (project.Tests.length === 0) {
          responseHandler.fail(res, 403, '학습 결과가 없습니다.');
        } else {
          let result_list = [];

          test_results = project.Tests;
          for (let test_result of test_results) {
            let used_dataset = await models.Dataset.findOne({
              where: {
                id: test_result.dataValues.datasetID
              }
            })
            let dataset_name = used_dataset.dataValues.datasetName;
            let loss = test_result.loss;
            let accuracy = test_result.accuracy;

            result_list.push({ id: test_result.id, dataset: dataset_name, loss: loss, accuracy: accuracy });
          }
          responseHandler.success(res, 200, result_list);
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      })
  },

  async trainModel(req, res) {
    try {
      const project = await models.Project.findOne({
        where: {
          userID: req.session.userID,
          id: req.params.project_id
        }
      })
      const class_list = await models.Class.findAll({
        include: [{
          model: models.Image,
        }],
        where: {
          datasetID: req.body.dataset_id
        }
      });

      if (!project) {
        responseHandler.fail(res, 403, "잘못 된 접근");
      } else if (!class_list.length) {
        responseHandler.fail(res, 403, "학습데이터가 없습니다");
      } else {
        let proj_path = project.dataValues.projectPath;
        let proj = JSON.parse(fs.readFileSync(`${proj_path}/${project_file}`).toString());
        let dataset_id = req.body.dataset_id
        let learning_rate = req.body.learning_rate;

        let model = getModelFromJson(proj, learning_rate);

        if (typeof model === 'string') {
          responseHandler.fail(res, 403, model);
        } else if (model.output.shape[1] !== class_list.length) {
          responseHandler.fail(res, 403, `class_num and output_num missmatched <class_num : ${class_list.length}  your output_num : ${model.output.shape[1]}>`);
        } else {
          //model train param
          let epoch = req.body.epochs//proj.models[0].fit.epochs;
          let batch_size = req.body.batches//proj.models[0].fit.batch_size;
          let val_per = req.body.validation_per//proj.models[0].fit.val_data_per;

          const history_original = `${proj_path}/result/train_history.json`;
          const history_backup = `${proj_path}/result/history_backup.json`;

          const start_json = {
            success: true,
            state: "no_result",
            epochs: 0,
            batch_size: 0,
            val_per: 0,
            history: []
          }

          let history_exist = fs.existsSync(history_original);

          if (history_exist) {
            fs.renameSync(history_original, history_backup);
          }
          fs.writeFileSync(history_original, JSON.stringify(start_json));

          imageToTensor(class_list, proj, function (image_err, x_train, y_train) {
            if (image_err) {
              fs.unlinkSync(history_original);
              fs.renameSync(history_backup, history_original);
            } else {
              trainModel(model, x_train, y_train, epoch, batch_size, val_per, proj_path, ((train_err) => {
                if (train_err) {
                  const fail_json = {
                    result: false,
                    state: "end_training",
                    epochs: 0,
                    batch_size: 0,
                    val_per: 0,
                    history: []
                  };
                  fs.writeFileSync(history_original, JSON.stringify(fail_json));
                  setTimeout(() => {
                    fs.unlinkSync(history_original);
                    fs.renameSync(history_backup, history_original);
                  }, 3500)
                } else {
                  let result_save_path = `${proj_path}/result`;
                  model.save(`file://${result_save_path}`);

                  if (fs.existsSync(history_backup)) {
                    fs.unlinkSync(history_backup);
                  }
                  models.Train.findOne({
                    where: {
                      projectID: project.dataValues.id,
                      datasetID: dataset_id,
                      resultPath: result_save_path
                    }
                  })
                    .then((result_exist) => {
                      if (!result_exist) {
                        models.Train.create({
                          projectID: project.dataValues.id,
                          datasetID: dataset_id,
                          resultPath: result_save_path
                        });
                      }
                    })
                }
              }));
            }
          });
          let image_num = 0;
          for (var _class of class_list) {
            image_num = image_num + _class.dataValues.Images.length;
          }
          responseHandler.custom(res, 200, { message: "모델 학습 시작", epoch: epoch, image_num: image_num });
        }
      }
    } catch (err) {
      console.log(err);
      responseHandler.fail(res, 500, "처리 실패");
    }

    /* ==== function for train model ====*/
    //JSON to model function
    function getModelFromJson(proj, learning_rate) {
      let model = tf.sequential();

      for (var _model of proj.models) {
        try {
          for (var _layer of _model.layers) {
            model.add(tf.layers[_layer.type](_layer.params));
          }
        } catch (e) {
          return `${e}\r\nModel ID: ${_model.ID} LayerID : ${_layer.ID}`;
        }
      }

      try {
        let optimizer = tf.train[proj.models[0].compile.optimizer](learning_rate);
        model.compile({
          optimizer: optimizer,
          loss: proj.models[0].compile.loss,
          metrics: ['accuracy'],
        });
        model.summary()
        return model;
      } catch (err) {
        return `Optimizer or Loss function error`;
      }
    }

    async function imageToTensor(class_list, proj, callback) {
      try {
        let class_num = class_list.length
        let first_layer = proj.models[0].layers[0].type;
        let x_list = [];
        let y_list = [];
        let one_hot = 0;
        let promise_list = [];

        if (first_layer === 'dense') {

          for (let _class of class_list) {
            _class = _class.dataValues
            let images = _class.Images;

            for (let image of images) {
              promise_list.push(
                fsp.readFile(image.originalPath)
                  .then((data) => {
                    let result = tf.node.decodeImage(data);
                    result = result.flatten().toFloat();

                    x_list.push(result.toFloat());
                    y_list.push(tf.oneHot(one_hot, class_num));
                  })
              )
            }
            one_hot++;
          }

        } else {

          for (let _class of class_list) {
            _class = _class.dataValues
            let images = _class.Images;

            for (let image of images) {
              promise_list.push(
                await fsp.readFile(image.originalPath)
                  .then((data) => {
                    let result = tf.node.decodeImage(data);
                    x_list.push(result.toFloat());
                    y_list.push(tf.oneHot(one_hot, class_num));
                  })
              )
            }
            one_hot++;
          }
        }
        await Promise.all(promise_list);
        let x_train = tf.stack(x_list);
        let y_train = tf.stack(y_list);
        let err = null;

        x_train = x_train.div(tf.scalar(255.0));

        callback(err, x_train, y_train);
      } catch {
        let x_train = null;
        let y_train = null;
        callback(err, x_train, y_train);
      }
    }

    //model train function
    async function trainModel(model, x_train, y_train, epoch, batch_size, vali_per, project_path, callback) {
      const history_file = `${project_path}/result/train_history.json`;
      const history_tmp = `${project_path}/result/train_history_tmp.json`
      let result_json;

      let history_list = [];

      try {
        for (let e = 0; e < epoch; e++) {
          let history = await model.fit(x_train, y_train, {
            epochs: 1,
            batchSize: batch_size,
            shuffle: true,
            validationSplit: vali_per,
          })

          if (vali_per === 0) {
            history_list.push({ loss: history.history.loss[0], acc: history.history.acc[0] });
          } else {
            history_list.push({ loss: history.history.loss[0], acc: history.history.acc[0], val_loss: history.history.val_loss[0], val_acc: history.history.val_acc[0] });
          }

          result_json = {
            success: true,
            state: "do_training",
            epochs: epoch,
            batch_size: batch_size,
            val_per: vali_per,
            history: history_list
          }
          fs.writeFileSync(history_file, JSON.stringify(result_json));
          fs.copyFileSync(history_file, history_tmp);

        }
        result_json = {
          success: true,
          state: "end_training",
          epochs: epoch,
          batch_size: batch_size,
          val_per: vali_per,
          history: history_list
        }
        fs.writeFileSync(history_file, JSON.stringify(result_json));
        fs.unlinkSync(history_tmp)
        callback(null);
      } catch (err) {
        console.log(err);
        fs.access(history_tmp, fs.F_OK, (access_err) => {
          if (!access_err) {
            fs.unlinkSync(history_tmp)
          }
        })
        callback(err);
      }
    }
  },

  async testModel(req, res) {
    let project_id = req.params.project_id;

    try {
      let result_exist = await models.Project.findOne({
        include: [{
          model: models.Train,
          where: {
            projectID: project_id
          }
        }],
        where: {
          userID: req.session.userID,
        }
      });

      if (!result_exist) {
        responseHandler.fail(res, 403, '학습 결과가 없습니다.');
      } else {
        let proj_path = result_exist.dataValues.projectPath;
        let proj = JSON.parse(fs.readFileSync(`${proj_path}/${project_file}`).toString());
        let dataset_id = req.body.dataset_id;

        const test_model = await tf.loadLayersModel(`file://${proj_path}/result/model.json`);
        test_model.compile({
          optimizer: proj.models[0].compile.optimizer,
          loss: proj.models[0].compile.loss,
          metrics: ['accuracy']
        });
        test_model.summary();

        let class_list = await models.Class.findAll({
          include: [{
            model: models.Image,
          }],
          where: {
            datasetID: dataset_id
          }
        });

        //image load for train
        let x_list = [];
        let y_list = [];
        let one_hot = 0;

        if (test_model.input.name === "conv2d_Conv2D1_input") {
          for (let _class of class_list) {
            _class = _class.dataValues

            let images = _class.Images;
            for (let image of images) {
              let image_data = fs.readFileSync(image.originalPath);
              let result = tf.node.decodeImage(image_data);
              x_list.push(result.toFloat());
              y_list.push(tf.oneHot(one_hot, class_list.length))
            }
            one_hot++;
          }
        } else {
          for (let _class of class_list) {
            _class = _class.dataValues

            let images = _class.Images;
            for (let image of images) {
              let image_data = fs.readFileSync(image.originalPath);
              let result = tf.node.decodeImage(image_data);
              result.flatten();
              x_list.push(result.toFloat());
              y_list.push(tf.oneHot(one_hot, class_list.length))
            }
            one_hot++;
          }
        }

        //change image into tensor
        let x_test = tf.stack(x_list);
        let y_test = tf.stack(y_list);

        x_test = x_test.div(tf.scalar(255.0));

        const result = test_model.evaluate(x_test, y_test);

        let result_json = { loss: result[0].dataSync()[0], accuracy: result[1].dataSync()[0] }
        if (req.body.save_option) {
          models.Test.create({
            datasetID: dataset_id,
            projectID: project_id,
            loss: result_json.loss,
            accuracy: result_json.accuracy
          }).then(() => {
            models.Test.findAll({
              where: {
                projectID: project_id
              },
              order: [['id', 'asc']]
            }).then((saved_results) => {
              if (saved_results.length > 5) {
                models.Test.destroy({
                  where: {
                    id: saved_results[0].dataValues.id
                  }
                })
              }
            })
          })
        }
        responseHandler.success(res, 200, result_json)
      }
    } catch (err) {
      responseHandler.fail(res, 500, '처리 실패')
    }
  }

};

