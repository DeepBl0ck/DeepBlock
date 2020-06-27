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
          let proj = fs.readFileSync(`${proj_path}/${project_file}`).toString();

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
          let model = req.body.modelJson;
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
          responseHandler.fail(res, 401, "Wrong approach");
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
            let dataset_id = used_dataset.dataValues.id;
            let accuracy = test_result.accuracy;
            let correct = test_result.correct;
            let incorrect = test_result.incorrect;

            result_list.push({
              id: test_result.id,
              dataset_id: dataset_id,
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
        responseHandler.fail(res, 401, "Wrong approach");
      } else if (test_result.dataValues.Tests[0].length === 0) {
        responseHandler.fail(res, 401, "Wrong approach");
      } else {
        const type = req.query.type;
        const case1 = req.query.case1;
        const case2 = req.query.case2;
        const answer = req.query.answer;
        const offset = req.query.offset;
        const limit = 8;

        const start = limit * offset;

        let find_condition = { testID: test_id };
        find_condition['type'] = type;
        if (case1) {
          find_condition['predict1'] = case1;
        }
        if (case2) {
          find_condition['predict2'] = case2;
        }
        if (answer) {
          find_condition['answer'] = answer;
        }

        let predict_list = await models.Prediction.findAll({
          limit: limit,
          offset: parseInt(start),
          where: find_condition,
          order: [["id", "asc"]],
        })


        let res_json = [];
        for (let pred of predict_list) {
          pred = pred.dataValues;
          const src = await datauri(pred.imagePath);
          const predict = [pred.predict1, pred.predict2];
          const percent = [parseFloat(
            (pred.percent1 * 100).toFixed(3)
          ), parseFloat(
            (pred.percent2 * 100).toFixed(3)
          )]
          res_json.push({ id: pred.id, src: src, predict: predict, percent: percent, answer: pred.answer });
        }

        responseHandler.custom(res, 200, res_json);
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async predictOneImage(req, res) {
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
        let test_id = req.params.test_id;
        let predict_id = req.params.predict_id;

        const test_model = await tf.loadLayersModel(
          `file://${proj_path}/result/model.json`
        );
        test_model.compile({
          optimizer: result_exist.dataValues.Trains[0].optimizer,
          loss: result_exist.dataValues.Trains[0].lossFunction,
          metrics: ["accuracy"],
        });

        let image = await models.Test.findOne({
          include: [{
            model: models.Prediction,
            where: {
              id: predict_id
            }
          }],
          where: {
            id: test_id
          }
        })

        if (!image) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else if (image.dataValues.Predictions.length === 0) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          let x_list = [];
          let images_path = image.dataValues.Predictions[0].dataValues.imagePath;
          let image_data = fs.readFileSync(images_path);
          let result = tf.node.decodeImage(image_data);
          if (proj.models[0].layers[0].type === 'dense') {
            result.flatten();
          }
          x_list.push(result.toFloat());
          let x_test = tf.stack(x_list);
          x_test = x_test.div(tf.scalar(255.0));
          const p_result = test_model.predictOnBatch(x_test).dataSync();
          let percent_list = [];
          for (let per of p_result) {
            percent_list.push(per);
          }
          responseHandler.custom(res, 200, { result: percent_list, src: await datauri(images_path) })
        }
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
        responseHandler.fail(res, 401, "Wrong approach");
      } else if (!class_list.length) {
        responseHandler.fail(res, 403, "No learning data");
      } else {
        let proj_path = project.dataValues.projectPath;
        let proj = JSON.parse(
          fs.readFileSync(`${proj_path}/${project_file}`).toString()
        );
        let dataset_id = req.body.dataset_id;
        let learning_rate = req.body.learning_rate;
        let optimizer = req.body.optimizer;
        let loss_function = req.body.loss_function;

        let input_shape = tf.node.decodeImage(fs.readFileSync(class_list[0].dataValues.Images[0].dataValues.originalPath));
        let model = getModelFromJson(proj, input_shape.shape, learning_rate, optimizer, loss_function);

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
          let epoch = req.body.epochs;
          let batch_size = req.body.batches;
          let val_per = req.body.validation_per;


          const history_original = `${proj_path}/result/train_history.json`;
          const history_backup = `${proj_path}/result/history_backup.json`;
          const history_tmp = `${proj_path}/result/train_history_tmp.json`;

          const start_json = {
            success: true,
            state: "no_result",
            epochs: 0,
            batch_size: 0,
            val_per: 0,
            history: [],
          };

          let history_exist = fs.existsSync(history_original);
          let tmp_exist = fs.existsSync(history_tmp);

          if (tmp_exist) {
            fs.unlinkSync(history_tmp);
          }

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
                  models.Test.destroy({
                    where: {
                      projectID: project.dataValues.id
                    }
                  })

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
                        optimizer: optimizer,
                        lossFunction: loss_function
                      });
                    } else {
                      models.Train.update({
                        optimizer: optimizer,
                        lossFunction: loss_function
                      }, {
                        where: {
                          id: result_exist.dataValues.id
                        }
                      })
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
      console.log(err);
      responseHandler.fail(res, 500, "Processing fail");
    }

    /* ==== function for train model ====*/
    //JSON to model function
    function getModelFromJson(proj, shape, learning_rate, Optimize_func, loss_func) {
      let model = tf.sequential();
      let first_layer = true;

      for (var _model of proj.models) {
        try {
          for (var _layer of _model.layers) {
            let params = { ..._layer.required, ..._layer.advanced };
            if (first_layer) {
              let input_shape = { inputShape: shape };
              params = { ...params, ...input_shape };
              first_layer = false;
            }
            Object.keys(params).forEach((key) => (params[key] == '') && delete params[key]);
            model.add(tf.layers[_layer.type](params));
          }
        } catch (e) {
          return `${e}\r\n  Tab Name: ${_model.tabName} LayerID : ${parseInt(_layer.ID) + 1}`;
        }
      }

      try {
        let optimizer = tf.train[Optimize_func](
          learning_rate
        );
        model.compile({
          optimizer: optimizer,
          loss: loss_func,
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
          let history = await model.fit(x_train, y_train, {
            epochs: 1,
            batchSize: parseInt(batch_size),
            shuffle: true,
            validationSplit: vali_per,
          });
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
          optimizer: result_exist.dataValues.Trains[0].optimizer,
          loss: result_exist.dataValues.Trains[0].lossFunction,
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
        let class_name = [];
        let images_path = [];
        let first_layer = proj.models[0].layers[0].type;

        if (first_layer !== "dense") {
          for (let _class of class_list) {
            _class = _class.dataValues;
            let images = _class.Images;

            for (let image of images) {
              let image_data = fs.readFileSync(image.originalPath);
              let result = tf.node.decodeImage(image_data);
              x_list.push(result.toFloat());
              images_path.push(image.originalPath);
              class_name.push(_class.className);
            }
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
              images_path.push(image.originalPath);
              class_name.push(_class.className);
            }

          }
        }

        //change image into tensor
        let x_test = tf.stack(x_list);
        x_test = x_test.div(tf.scalar(255.0));

        const p_result = await startPredict(test_model, x_test);
        let tmp_list = [];
        let correct = 0;
        let incorrect = 0;
        let row = [];
        for (var i = 0; i < p_result.dataSync().length; i++) {
          tmp_list.push(p_result.dataSync()[i]);

          if ((i + 1) % class_list.length === 0) {
            let per_list = [];
            let predict_list = [];
            for (var rank = 0; rank < 2; rank++) {
              const max_value = Math.max.apply(null, tmp_list);
              const predict = class_list[tmp_list.indexOf(max_value)].className
              per_list.push(max_value);
              predict_list.push(predict);

              tmp_list[tmp_list.indexOf(max_value)] = -1;
            }

            const p = (i + 1) / class_list.length - 1;
            if (predict_list[0] === class_name[p]) {
              row.push({
                type: "correct",
                predict1: predict_list[0],
                predict2: predict_list[1],
                percent1: per_list[0],
                percent2: per_list[1],
                answer: class_name[p],
                imagePath: images_path[p],
              });
              correct = correct + 1;
            } else {
              row.push({
                type: "incorrect",
                predict1: predict_list[0],
                predict2: predict_list[1],
                percent1: per_list[0],
                percent2: per_list[1],
                answer: class_name[p],
                imagePath: images_path[p],
              });
              incorrect = incorrect + 1;
            }
            tmp_list = [];
          }
        }

        const accuracy =
          (correct / (correct + incorrect)) * 100;

        if (req.body.save_option) {
          let test = await models.Test.create({
            datasetID: dataset_id,
            projectID: project_id,
            accuracy: accuracy,
            correct: correct,
            incorrect: incorrect,
          })

          if (test) {
            let saved_results = await models.Test.findAll({
              where: {
                projectID: project_id,
              },
              order: [["id", "asc"]],
            })

            if (saved_results.length > 5) {
              models.Test.destroy({
                where: {
                  id: saved_results[0].dataValues.id,
                },
              })
            }
            for (var line = 0; line < row.length; line++) {
              row[line]['testID'] = test.dataValues.id;
            }
            models.Prediction.bulkCreate(row);
          }
        }
        responseHandler.custom(res, 200, {
          accuracy: accuracy,
          correct: correct,
          incorrect: incorrect,
        });
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
    }

    function startPredict(model, x_test) {
      return new Promise(function (resolve, reject) {
        let result = model.predict(x_test);
        resolve(result);
      });
    }

  },
};