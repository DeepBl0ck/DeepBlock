"use strict";

const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs").promises;
const datauri = require("datauri");
const rimraf = require("rimraf");
const models = require("../models");
const path = require("@config/path");
const responseHandlerdler = require("@utils/responseHandler");
const salt = process.env.SALT;

module.exports = {
  async viewDatasetList(req, res) {
    models.Dataset.findAll({
      where: {
        userID: req.session_id,
      },
    })
      .then(async function (dataset_info) {
        if (!dataset_info.length) {
          responseHandlerdler.custom(res, 200, {
            result: "success",
            dataset_info: {},
          });
        } else {
          let dataset_arr = [];
          for (var _dataset of dataset_info) {
            let thumbnail_image = null;
            _dataset = _dataset.dataValues;

            let first_image = await models.Class.findOne({
              include: [
                {
                  model: models.Image,
                },
              ],
              where: {
                datasetID: _dataset.id,
              },
            });

            if (first_image) {
              if (first_image.dataValues.Images.length) {
                thumbnail_image = await datauri(
                  first_image.dataValues.Images[0].dataValues.thumbnailPath
                );
              }
            } else {
              thumbnail_image = await datauri("./public/White.png");
            }

            dataset_arr.push({
              id: _dataset.id,
              src: thumbnail_image,
              name: _dataset.datasetName,
              description: _dataset.description,
            });
          }

          responseHandlerdler.custom(res, 200, {
            result: "success",
            dataset_info: dataset_arr,
          });
        }
      })
      .catch((err) => {
        responseHandlerdler.fail(res, 500, "Processing fail");
      });
  },

  async createDataset(req, res) {
    let user_dataset_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const user_dataset = await models.Dataset.findOne({
        where: {
          userID: req.session_id,
          datasetName: req.body.dataset_name,
        },
      });

      if (user_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 409, "Duplicate dataset name");
      } else {
        const hashed_id = crypto
          .createHash("sha256")
          .update(req.session_name + salt)
          .digest("hex");
        user_dataset_path = `${path.storage}/${hashed_id}/${path.dataset}/${req.body.dataset_name}`;

        let result = await models.Dataset.create(
          {
            userID: req.session_id,
            datasetName: req.body.dataset_name,
            datasetPath: user_dataset_path,
            description: req.body.description,
          },
          {
            transaction,
          }
        );

        fs.mkdirSync(user_dataset_path);
        fs.mkdirSync(`${user_dataset_path}/original`);
        fs.mkdirSync(`${user_dataset_path}/thumbnail`);

        await transaction.commit();
        let dataset_id = result.dataValues.id;
        responseHandlerdler.custom(res, 200, {
          result: "success",
          dataset_id: dataset_id,
        });
      }
    } catch (err) {
      if (user_dataset_path) {
        fs.access(user_dataset_path, fs.constants.F_OK, (e) => {
          if (!e) {
            rimraf.sync(user_dataset_path);
          }
        });
      }
      if (transaction) {
        transaction.rollback();
      }
      responseHandlerdler.fail(res, 500, "Processing fail");
    }
  },

  async deleteDataset(req, res) {
    let user_dataset_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const user_dataset = await models.Dataset.findOne({
        where: {
          userID: req.session_id,
          id: req.params.dataset_id,
        },
      });

      if (!user_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 401, "Wrong approach");
      } else {
        user_dataset_path = user_dataset.dataValues.datasetPath;

        await models.Dataset.destroy(
          {
            where: {
              userID: req.session_id,
              id: req.params.dataset_id,
              datasetPath: user_dataset_path,
            },
          },
          {
            transaction,
          }
        );

        rimraf.sync(user_dataset_path);
        await transaction.commit();
        responseHandlerdler.success(res, 200, "Delete success");
      }
    } catch (err) {
      //FIX: null type check
      if (transaction) {
        transaction.rollback();
      }
      responseHandlerdler.fail(res, 500, "Processing fail");
    }
  },

  async updateDatasetName(req, res) {
    let before_dataset_path = null;
    let after_dataset_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const before_dataset = await models.Dataset.findOne({
        where: {
          userID: req.session_id,
          id: req.params.dataset_id,
        },
      });

      if (!before_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 401, "Wrong approach");
        //throw { status: 400, message: 'Wrong approach'}
      } else if (
        await models.Dataset.findOne({
          where: { userID: req.session_id, datasetName: req.body.after },
        })
      ) {
        transaction.rollback();
        responseHandlerdler.fail(res, 409, "Duplicate dataset name");
      } else {
        const hashed_id = crypto
          .createHash("sha256")
          .update(req.session_name + salt)
          .digest("hex");
        const after_dataset_name = req.body.after;

        before_dataset_path = before_dataset.dataValues.datasetPath;
        after_dataset_path = `${path.storage}/${hashed_id}/${path.dataset}/${after_dataset_name}`;

        await models.Dataset.update(
          {
            datasetName: after_dataset_name,
            datasetPath: after_dataset_path,
          },
          {
            where: {
              userID: req.session_id,
              id: req.params.dataset_id,
            },
          },
          {
            transaction,
          }
        );

        fsp.rename(before_dataset_path, after_dataset_path);
        await transaction.commit();
        responseHandlerdler.success(res, 200, "Rename success");
      }
    } catch (err) {
      if (after_dataset_path) {
        fs.access(after_dataset_path, fs.constants.F_OK, (e) => {
          if (!e) {
            fsp.rename(after_dataset_path, before_dataset_path);
          }
        });
      }
      //FIX: null type check
      if (transaction) {
        transaction.rollback();
      }
      responseHandlerdler.fail(res, 500, "Processing fail");
    }
  },
};
