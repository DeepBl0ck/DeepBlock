"use strict";

const fs = require("fs");
const fsp = require("fs").promises;
const datauri = require("datauri");
const tf = require("@tensorflow/tfjs-node");
const models = require("../models");
const project_file = "deep_neural_network_model.json";
const responseHandler = require("@utils/responseHandler");

module.exports = {
  loadModelOfProject(req, res) {
    models.User.findOne({
      include: [
        {
          model: models.Project,
          where: {
            id: req.params.project_id,
          },
        },
      ],
      where: {
        id: req.session_id,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          let proj_path = user.dataValues.Projects[0].projectPath;
          let proj = JSON.parse(
            fs.readFileSync(`${proj_path}/${project_file}`).toString()
          );

          responseHandler.custom(res, 200, proj);
        }
      })
      .catch(() => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  // Run 5 per second when user see board-offset
  updateModel(req, res) {
    models.User.findOne({
      include: [
        {
          model: models.Project,
          where: {
            id: req.params.project_id,
          },
        },
      ],
      where: {
        id: req.session_id,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          let model = JSON.stringify(req.body);
          let proj = `${user.dataValues.Projects[0].projectPath}/${project_file}`;

          fs.open(proj, "w", function (err, file_id) {
            if (err) throw err;
            fs.writeSync(file_id, model, 0, model.length, null);
            fs.closeSync(file_id);
          });

          responseHandler.success(res, 200, "Saved success");
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  trainResult(req, res) {
    models.Project.findOne({
      where: {
        userID: req.session_id,
        id: req.params.project_id,
      },
    })
      .then((project) => {
        let history_path = `${project.dataValues.projectPath}/result/train_history.json`;
        let history_backup_path = `${project.dataValues.projectPath}/result/train_history_tmp.json`;

        try {
          fs.accessSync(`${history_backup_path}`, fs.F_OK);
          const train_history_json = JSON.parse(
            fs.readFileSync(history_backup_path).toString()
          );
          responseHandler.custom(res, 200, train_history_json);
        } catch {
          try {
            fs.accessSync(`${history_path}`, fs.F_OK);
            const train_history_json = JSON.parse(
              fs.readFileSync(history_path).toString()
            );
            responseHandler.custom(res, 200, train_history_json);
          } catch {
            responseHandler.fail(res, 403, "No results");
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  testResult(req, res) {
    models.Project.findOne({
      include: [
        {
          model: models.Test,
        },
      ],
      where: {
        userID: req.session_id,
        id: req.params.project_id,
      },
    })
      .then(async function (project) {
        if (!project) {
          responseHandler.fail(res, 403, "Wrong approach");
        } else if (project.dataValues.Tests.length === 0) {
          responseHandler.fail(res, 403, "No learning results");
        } else {
          let result_list = [];
          project = project.dataValues;

          const test_results = project.Tests;
          for (let test_result of test_results) {
            let used_dataset = await models.Dataset.findOne({
              where: {
                id: test_result.dataValues.datasetID,
              },
            });
            let dataset_name = used_dataset.dataValues.datasetName;
            let accuracy = test_result.accuracy;
            let correct = test_result.correct;
            let incorrect = test_result.incorrect;

            result_list.push({
              id: test_result.id,
              dataset: dataset_name,
              accuracy: accuracy,
              correct: correct,
              incorrect: incorrect,
            });
          }
          responseHandler.success(res, 200, result_list);
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async predictResult(req, res) {
    try {
      const project_id = req.params.project_id;
      const test_id = req.params.test_id;
      const offset = req.query.offset;
      const type = req.query.type;
      const limit = 12; //req.query.limit;

      const test_result = await models.Project.findOne({
        include: [
          {
            model: models.Test,
            where: {
              id: test_id,
            },
          },
        ],
        where: {
          userID: req.session_id,
          id: project_id,
        },
      });

      if (!test_result) {
        responseHandler.fail(res, 403, "Wrong approach");
      } else if (test_result.dataValues.Tests[0].length === 0) {
        responseHandler.fail(res, 403, "Wrong approach");
      } else {
        const result_path = test_result.dataValues.Tests[0].dataValues.testPath;

        const test_json = JSON.parse(fs.readFileSync(result_path).toString());
        let res_json = [];
        const start = limit * offset;
        const end = limit * offset + limit;

        for (var p = start; p < end; p++) {
          if (p >= test_json[type].length) {
            break;
          }
          const src = await datauri(test_json[type][p].path);
          const predict = test_json[type][p].predict;
          const percent = parseFloat(
            (test_json[type][p].percent * 100).toFixed(3)
          );

          res_json.push({ src: src, predict: predict, percent: percent });
        }

        responseHandler.custom(res, 200, res_json);
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async trainModel(req, res) {
    try {
      const project = await models.Project.findOne({
        where: {
          userID: req.session_id,
          id: req.params.project_id,
        },
      });
      const class_list = await models.Class.findAll({
        include: [
          {
            model: models.Image,
          },
        ],
        where: {
          datasetID: req.body.dataset_id,
        },
      });

      if (!project) {
        responseHandler.fail(res, 403, "Wrong approach");
      } else if (!class_list.length) {
        responseHandler.fail(res, 403, "No learning data");
      } else {
        let proj_path = project.dataValues.projectPath;
        let proj = JSON.parse(
          fs.readFileSync(`${proj_path}/${project_file}`).toString()
        );
        let dataset_id = req.body.dataset_id;
        let learning_rate = req.body.learning_rate;

        let model = getModelFromJson(proj, learning_rate);

        if (typeof model === "string") {
          responseHandler.fail(res, 403, model);
        } else if (model.output.shape[1] !== class_list.length) {
          responseHandler.fail(
            res,
            403,
            `class_num and output_num missmatched <class_num : ${class_list.length}  your output_num : ${model.output.shape[1]}>`
          );
        } else {
          //model train param
          let epoch = req.body.epochs; //proj.models[0].fit.epochs;
          let batch_size = req.body.batches; //proj.models[0].fit.batch_size;
          let val_per = req.body.validation_per; //proj.models[0].fit.val_data_per;

          const history_original = `${proj_path}/result/train_history.json`;
          const history_backup = `${proj_path}/result/history_backup.json`;

          const start_json = {
            success: true,
            state: "no_result",
            epochs: 0,
            batch_size: 0,
            val_per: 0,
            history: [],
          };

          let history_exist = fs.existsSync(history_original);

          if (history_exist) {
            fs.renameSync(history_original, history_backup);
          }
          fs.writeFileSync(history_original, JSON.stringify(start_json));

          imageToTensor(class_list, proj, function (image_err, x_train, y_train
          ) {
            if (image_err) {
              fs.unlinkSync(history_original);
              fs.renameSync(history_backup, history_original);
            } else {
              trainModel(model, x_train, y_train, epoch, batch_size, val_per, proj_path, (train_err) => {
                if (train_err) {
                  const fail_json = {
                    result: false,
                    state: "end_training",
                    epochs: 0,
                    batch_size: 0,
                    val_per: 0,
                    history: [],
                  };
                  fs.writeFileSync(
                    history_original,
                    JSON.stringify(fail_json)
                  );
                  setTimeout(() => {
                    fs.unlinkSync(history_original);
                    fs.renameSync(history_backup, history_original);
                  }, 3500);
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
                      resultPath: result_save_path,
                    },
                  }).then((result_exist) => {
                    if (!result_exist) {
                      models.Train.create({
                        projectID: project.dataValues.id,
                        datasetID: dataset_id,
                        resultPath: result_save_path,
                      });
                    }
                  });
                }
              }
              );
            }
          });
          let image_num = 0;
          for (var _class of class_list) {
            image_num = image_num + _class.dataValues.Images.length;
          }
          responseHandler.custom(res, 200, {
            message: "Start learning",
            epoch: epoch,
            image_num: image_num,
          });
        }
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
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
        let optimizer = tf.train[proj.models[0].compile.optimizer](
          learning_rate
        );
        model.compile({
          optimizer: optimizer,
          loss: proj.models[0].compile.loss,
          metrics: ["accuracy"],
        });
        model.summary();
        return model;
      } catch (err) {
        return `Optimizer or Loss function error`;
      }
    }

    async function imageToTensor(class_list, proj, callback) {
      try {
        let class_num = class_list.length;
        let first_layer = proj.models[0].layers[0].type;
        let x_list = [];
        let y_list = [];
        let one_hot = 0;
        let promise_list = [];

        if (first_layer === "dense") {
          for (let _class of class_list) {
            _class = _class.dataValues;
            let images = _class.Images;

            for (let image of images) {
              promise_list.push(
                await fsp.readFile(image.originalPath).then((data) => {
                  let result = tf.node.decodeImage(data);
                  result = result.flatten().toFloat();
                  x_list.push(result.toFloat());
                  y_list.push(tf.oneHot(one_hot, class_num));
                })
              );
            }
            one_hot++;
          }
        } else {
          for (let _class of class_list) {
            _class = _class.dataValues;
            let images = _class.Images;

            for (let image of images) {
              promise_list.push(
                await fsp.readFile(image.originalPath).then((data) => {
                  let result = tf.node.decodeImage(data);
                  x_list.push(result.toFloat());
                  y_list.push(tf.oneHot(one_hot, class_num));
                })
              );
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
    async function trainModel(model, x_train, y_train, epoch, batch_size, vali_per, project_path, callback
    ) {
      const history_file = `${project_path}/result/train_history.json`;
      const history_tmp = `${project_path}/result/train_history_tmp.json`;
      let result_json;

      let history_list = [];
      try {
        for (let e = 0; e < parseInt(epoch); e++) {
          console.log("start");
          let history = await model.fit(x_train, y_train, {
            epochs: 1,
            batchSize: parseInt(batch_size),
            shuffle: true,
            validationSplit: vali_per,
          });
          console.log("end");
          if (vali_per === 0) {
            history_list.push({
              loss: history.history.loss[0],
              acc: history.history.acc[0],
            });
          } else {
            history_list.push({
              loss: history.history.loss[0],
              acc: history.history.acc[0],
              val_loss: history.history.val_loss[0],
              val_acc: history.history.val_acc[0],
            });
          }

          result_json = {
            success: true,
            state: "do_training",
            epochs: epoch,
            batch_size: batch_size,
            val_per: vali_per,
            history: history_list,
          };
          fs.writeFileSync(history_file, JSON.stringify(result_json));
          fs.copyFileSync(history_file, history_tmp);
        }
        result_json = {
          success: true,
          state: "end_training",
          epochs: epoch,
          batch_size: batch_size,
          val_per: vali_per,
          history: history_list,
        };
        fs.writeFileSync(history_file, JSON.stringify(result_json));
        fs.unlinkSync(history_tmp);
        callback(null);
      } catch (err) {
        fs.access(history_tmp, fs.F_OK, (access_err) => {
          if (!access_err) {
            fs.unlinkSync(history_tmp);
          }
        });
        callback(err);
      }
    }
  },

  async testModel(req, res) {
    let project_id = req.params.project_id;

    try {
      let result_exist = await models.Project.findOne({
        include: [
          {
            model: models.Train,
            where: {
              projectID: project_id,
            },
          },
        ],
        where: {
          userID: req.session_id,
        },
      });

      if (!result_exist) {
        responseHandler.fail(res, 403, "No learning results");
      } else {
        let proj_path = result_exist.dataValues.projectPath;
        let proj = JSON.parse(
          fs.readFileSync(`${proj_path}/${project_file}`).toString()
        );
        let dataset_id = req.body.dataset_id;

        const test_model = await tf.loadLayersModel(
          `file://${proj_path}/result/model.json`
        );
        test_model.compile({
          optimizer: proj.models[0].compile.optimizer,
          loss: proj.models[0].compile.loss,
          metrics: ["accuracy"],
        });
        test_model.summary();

        let class_list = await models.Class.findAll({
          include: [
            {
              model: models.Image,
            },
          ],
          where: {
            datasetID: dataset_id,
          },
        });
        //image load for train
        let x_list = [];
        let y_list = [];
        let class_name = [];
        let images_path = [];
        let one_hot = 0;
        let first_layer = proj.models[0].layers[0].type;

        if (first_layer !== "dense") {
          for (let _class of class_list) {
            _class = _class.dataValues;
            let images = _class.Images;

            for (let image of images) {
              let image_data = fs.readFileSync(image.originalPath);
              let result = tf.node.decodeImage(image_data);
              x_list.push(result.toFloat());
              y_list.push(tf.oneHot(one_hot, class_list.length));
              images_path.push(image.originalPath);
              class_name.push(_class.className);
            }
            one_hot++;
          }
        } else {
          for (let _class of class_list) {
            _class = _class.dataValues;
            let images = _class.Images;

            for (let image of images) {
              let image_data = fs.readFileSync(image.originalPath);
              let result = tf.node.decodeImage(image_data);
              result.flatten();
              x_list.push(result.toFloat());
              y_list.push(tf.oneHot(one_hot, class_list.length));
              images_path.push(image.originalPath);
              class_name.push(_class.className);
            }

            one_hot++;
          }
        }

        //change image into tensor
        let x_test = tf.stack(x_list);
        x_test = x_test.div(tf.scalar(255.0));

        const p_result = test_model.predict(x_test);
        let tmp_list = [];
        let correct = [];
        let incorrect = [];
        for (var i = 0; i < p_result.dataSync().length; i++) {
          tmp_list.push(p_result.dataSync()[i]);

          if ((i + 1) % class_list.length === 0) {
            const max_value = Math.max.apply(null, tmp_list);
            const predict = class_list[tmp_list.indexOf(max_value)].className;
            const p = (i + 1) / class_list.length - 1;
            if (predict === class_name[p]) {
              correct.push({
                path: images_path[p],
                predict: predict,
                percent: max_value,
              });
            } else {
              incorrect.push({
                path: images_path[p],
                predict: predict,
                percent: max_value,
              });
            }
            tmp_list = [];
          }
        }

        const save_path = `${proj_path}/result/${new Date().valueOf()}_save.json`;
        const result_json = { correct: correct, incorrect: incorrect };
        const accuracy =
          (correct.length / (correct.length + incorrect.length)) * 100;

        if (req.body.save_option) {
          models.Test.create({
            datasetID: dataset_id,
            projectID: project_id,
            accuracy: accuracy,
            correct: correct.length,
            incorrect: incorrect.length,
            testPath: save_path,
          }).then(() => {
            models.Test.findAll({
              where: {
                projectID: project_id,
              },
              order: [["id", "asc"]],
            }).then((saved_results) => {
              if (saved_results.length > 5) {
                models.Test.destroy({
                  where: {
                    id: saved_results[0].dataValues.id,
                  },
                }).then(() => {
                  fs.unlinkSync(saved_results[0].dataValues.testPath);
                });
              }
              fs.writeFileSync(save_path, JSON.stringify(result_json));
            });
          });
        }
        responseHandler.custom(res, 200, {
          accuracy: accuracy,
          correct: correct.length,
          incorrect: incorrect.length,
        });
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
    }
  },
};
