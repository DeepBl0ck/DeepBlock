'use strict';

const fs = require('fs');
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
          responseHandler.fail(res, 400, "잘못 된 접근입니다")
        } else {
          let proj_path = `${user.dataValues.Projects[0].projectPath}/${project_file}`;
          let proj = JSON.parse(fs.readFileSync(proj_path).toString());

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
          responseHandler.fail(res, 400, "잘못 된 접근입니다")
        } else {
          let model = JSON.stringify(req.body);
          let proj_path = `${user.dataValues.Projects[0].projectPath}/${project_file}`;

          fs.open(proj_path, 'w', (function (err, file_id) {
            if (err) throw err;
            fs.writeSync(file_id, model, 0, model.length, null);
            fs.closeSync(file_id);
          }));

          responseHandler.success(res, 200, "저장 성공");
        }
      })
      .catch((err) => {
        console.log(err);
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
        let train_result_path = `${project.dataValues.projectPath}/result/result.json`
        let back_path = `${project.dataValues.projectPath}/result/result_back.json`

        fs.access(`${back_path}`, fs.F_OK, (access_err) => {
          if (access_err) {
            fs.access(`${back_path}`, fs.F_OK, (access_err_2) => {
              if (access_err_2) {
                const train_result_json = JSON.parse(fs.readFileSync(train_result_path).toString());
                responseHandler.custom(res, 200, train_result_json);
              } else {
                responseHandler.fail(res, 500, '재요청')
              }
            });
          } else {
            const train_result_json = JSON.parse(fs.readFileSync(back_path).toString());
            responseHandler.custom(res, 200, train_result_json);
          }
        });
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
          responseHandler.fail(res, 403, '학습결과가 없습니다.');
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

  //TODO: tf.onehot (sync), promise all 사용안해도 됨 
  async trainModel(req, res) {
    try {
      let project = await models.Project.findOne({
        where: {
          userID: req.session.userID,
          id: req.params.project_id
        }
      })
      let class_list = await models.Class.findAll({
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
        let proj_path = `${project.dataValues.projectPath}/${project_file}`;
        let proj = JSON.parse(fs.readFileSync(proj_path).toString());

        let model = getModelFromJson(proj);

        if (typeof model === 'string') {
          responseHandler.fail(res, 400, model);
        } else if (model.output.shape[1] !== class_list.length) {
          responseHandler.fail(res, 403, `class_num and output_num missmatched <class_num : ${class_list.length}  output_num : ${model.output.shape[1]}>`);
        } else {
          //model train param
          let epoch = proj.models[0].fit.epochs;
          let batchs = proj.models[0].fit.batch_size;
          let val_per = proj.models[0].fit.val_data_per;
          let first_layer = proj.models[0].layers[0].type;

          let x_list = [];
          let y_list = [];

          let model_input;
          let image_load_promises = [];
          let one_hot = 0;

          if (first_layer === 'dense') {
            model_input = proj.models[0].layers[0].params.units;
            for (let _class of class_list) {
              _class = _class.dataValues

              let images = _class.Images;
              for (let image of images) {
                image_load_promises.push(new Promise((resolve) => {
                  let result = tf.node.decodeImage(fs.readFileSync(image.originalPath));
                  result = result.flatten().toFloat();
                  x_list.push(result);
                  y_list.push(tf.oneHot(one_hot, class_list.length));
                  resolve();
                }))
              }
              one_hot++;
            }
          } else {
            model_input = proj.models[0].layers[0].params.inputShape;
            for (let _class of class_list) {
              _class = _class.dataValues

              let images = _class.Images;
              for (let image of images) {
                image_load_promises.push(new Promise((resolve) => {
                  let result = tf.node.decodeImage(fs.readFileSync(image.originalPath));

                  x_list.push(result.toFloat());
                  y_list.push(tf.oneHot(one_hot, class_list.length));
                  resolve();
                }))
              }
              one_hot++;
            }
          }

          Promise.all(image_load_promises).then(() => {
            //change image into tensor

            let x_train = tf.stack(x_list);
            let y_train = tf.stack(y_list);

            x_train = x_train.div(tf.scalar(255.0));

            trainModel(model, x_train, y_train, epoch, batchs, val_per, project_path, (() => {
              let result_save_path = `${project_path}/result`;
              model.save(`file://${result_save_path}`);

              models.Train.findOne({
                where: {
                  projectID: project_info.dataValues.id,
                  datasetID: dataset_id,
                  resultPath: result_save_path
                }
              })
                .then((result_exist) => {
                  if (!result_exist) {
                    models.Train.create({
                      projectID: project_info.dataValues.id,
                      datasetID: dataset_id,
                      resultPath: result_save_path
                    });
                  }
                })
            }));
          })
          responseHandler.success(res, 200, "모델 학습 시작");
        }
      }
    } catch (err) {
      responseHandler.fail(res, 500, "처리 실패");
    }

    /* ==== function for train model ====*/
    //JSON to model function
    function getModelFromJson(proj) {
      let model = tf.sequential();

      for (var _model of proj.models) {
        try {
          for (var _layer of _model.layers) {
            model.add(tf.layers[_layer.type](_layer.params));
          }
          model.compile({
            optimizer: _model.compile.optimizer,
            loss: _model.compile.loss,
            metrics: ['accuracy'],
          });
          model.summary()
        } catch (e) {
          return `${e}\r\nModel ID: ${_model.ID} LayerID : ${_layer.ID}`;
        }
      }
      return model;
    }

    //model train function
    //TODO: result.json? result_back.json? 애매한 파일명(어떤 결과물인지), json_path? 애매한 변수명
    async function trainModel(model, x_train, y_train, epoch, batchs, vali_per, project_path, callback) {
      const json_path = `${project_path}/result/result.json`;
      const json_back_path = `${project_path}/result/result_back.json`
      let history_list = [];

      for (let e = 0; e < epoch; e++) {
        let history = await model.fit(x_train, y_train, {
          epochs: 1,
          batchSize: batchs,
          shuffle: true,
          validationSplit: vali_per,
        })

        history_list.push({ loss: history.history.loss[0], acc: history.history.acc[0] });
        let result_json = { history: history_list }

        fs.writeFileSync(json_path, JSON.stringify(result_json));
        if (e == epoch - 1) {
          fs.unlinkSync(json_back_path, (() => {/* error handling */ }))
        } else {
          fs.copyFileSync(json_path, json_back_path);
        }
      }
      callback(history_list);
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
        let project_info = result_exist.dataValues;
        let project_path = project_info.projectPath;
        //FIXME: 이런 한 번 쓰고 버리는 변수들은 오히려 가독성을 해침
        let saved_model_path = `${project_path}/result`;
        //FIXME: 마찬가지
        let save_option = req.body.save_option; //true or false
        let proj_path = `${project_path}/${project_file}`;
        let proj = JSON.parse(fs.readFileSync(proj_path).toString());

        let dataset_id = req.body.dataset_id;

        const test_model = await tf.loadLayersModel(`file://${saved_model_path}/model.json`);
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
          console.log('ji')
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
        if (save_option) {
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
      console.log(err);
      responseHandler.fail(res, 500, '처리 실패')
    }
  }

};

