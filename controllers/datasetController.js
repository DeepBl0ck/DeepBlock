'use strict'

// modules
const crypto              = require("crypto");
const fs                  = require('fs');
const fsp                 = require('fs').promises;
const rimraf              = require('rimraf');
// models - DB
const models              = require("../models");
// configs
const salt                = require('../config/configs').salt;
const base_path           = require('../config/configs').base_path;
const hash                = require('../config/configs').hash;
const dataset_dir_name    = require('../config/configs').datasets;
// utils
const responseHandlerdler = require('../utils/responseHandler');

module.exports = {
  async viewDatasetList(req, res) {
    models.Dataset.findAll({
      where: {
        userID: req.session.userID,
      }
    })
    .then((dataset_info) => {
      if (!dataset_info.length) {
        responseHandlerdler.custom(res, 200, {
          "result": "success",
          "dataset_num": 0,
          "dataset_list": {}
        });
      } else {
        let dataset_arr = [];

        for (var _dataset of dataset_info) {
          _dataset = _dataset.dataValues;
          dataset_arr.push({
            dataset_id: _dataset.id,
            dataset_name: _dataset.datasetName
          });
        }

        responseHandlerdler.custom(res, 200, {
          "result": "success",
          "dataset_num": dataset_arr.length,
          "dataset_list": dataset_arr
        });
      }
    })
    .catch((err) => {
      responseHandlerdler.fail(res, 500, "처리 실패");
    })
  },

  async createDataset(req, res) {
    let user_dataset_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const user_dataset = await models.Dataset.findOne({
        where: {
          userID: req.session.userID,
          datasetName: req.body.dataset_name
        }
      });

      if (user_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 409, "중복된 이름입니다");
      } else {
        const hashId = crypto.createHash(hash).update(req.session.username + salt).digest("hex");
        user_dataset_path = `${base_path}/${hashId}/${dataset_dir_name}/${req.body.dataset_name}`;

        await models.Dataset.create({
          userID: req.session.userID,
          datasetName: req.body.dataset_name,
          datasetPath: user_dataset_path
        }, {
          transaction
        });

        fs.mkdir(user_dataset_path, (err) => {
          fsp.mkdir(`${user_dataset_path}/original`);
          fsp.mkdir(`${user_dataset_path}/thumbnail`);
        });
        await transaction.commit();
        responseHandlerdler.success(res, 200, "생성 성공");
      }
    } catch (err) {
      if (user_dataset_path) {
        fs.access(user_dataset_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(user_dataset_path);
          }
        }));
      }
      transaction.rollback();
      responseHandlerdler.fail(res, 500, "처리 실패");
    }
  },

  async deleteDataset(req, res) {
    let user_dataset_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      
      const user_dataset = await models.Dataset.findOne({
        where: {
          userID: req.session.userID,
          id: req.params.dataset_id
        }
      });

      if (!user_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 400, "잘못 된 접근입니다");
      } else {
        user_dataset_path = user_dataset.dataValues.datasetPath;

        await models.Dataset.destroy({
          where: {
            userID: req.session.userID,
            id: req.params.dataset_id,
            datasetPath: user_dataset_path
          }
        }, {
          transaction
        });

        rimraf.sync(user_dataset_path);
        await transaction.commit();
        responseHandlerdler.success(res, 200, "삭제 성공");
      }
    } catch (err) {
      transaction.rollback();
      responseHandlerdler.fail(res, 500, "처리 실패");
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
          userID: req.session.userID,
          id: req.params.dataset_id
        }
      });

      if (!before_dataset) {
        transaction.rollback();
        responseHandlerdler.fail(res, 400, "잘못 된 접근입니다");
      } else if (await models.Dataset.findOne({ where: { userID: req.session.userID, datasetName: req.body.after } })) {
        transaction.rollback();
        responseHandlerdler.fail(res, 409, "중복된 이름입니다");
      } else {
        const hashId = crypto.createHash(hash).update(req.session.username + salt).digest("hex");
        const after_dataset_name = req.body.after;

        before_dataset_path = before_dataset.dataValues.datasetPath;
        after_dataset_path = `${base_path}/${hashId}/${dataset_dir_name}/${after_dataset_name}`;

        await models.Dataset.update({
          datasetName: after_dataset_name,
          datasetPath: after_dataset_path
        }, {
          where: {
            userID: req.session.userID,
            id: req.params.dataset_id,
          }
        }, {
          transaction
        });

        fsp.rename(before_dataset_path, after_dataset_path);
        await transaction.commit();
        responseHandlerdler.success(res, 200, "이름변경 성공");
      }
    } catch (err) {
      if (after_dataset_path) {
        fs.access(after_dataset_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            fsp.rename(after_dataset_path, before_dataset_path);
          }
        }));
      }
      transaction.rollback();
      responseHandlerdler.fail(res, 500, "처리 실패");
    }
  }
};