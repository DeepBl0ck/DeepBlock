'use strict'

const crypto              = require("crypto");
const fs                  = require('fs');
const datauri             = require('datauri')
const fsp                 = require('fs').promises;
const rimraf              = require('rimraf');
const models              = require("../models");
const path                = require("@config/path");
const responseHandlerdler = require('@utils/responseHandler');
const salt                = process.env.SALT;

module.exports = {
  async viewDatasetList(req, res) {
    models.Dataset.findAll({
      where: {
        userID: req.session.userID,
      }
    })
    .then(async function(dataset_info){
      if (!dataset_info.length) {
        responseHandlerdler.custom(res, 200, {
          "result": "success",
          "dataset_list": {}
        });
      } else { 
        let dataset_arr = [];
        let thumbnail_image = null;
        for (var _dataset of dataset_info) {
          _dataset = _dataset.dataValues;

          let first_image = await models.Class.findOne({
            include : [{
              model : models.Image,
            }],
            where : {
              datasetID : _dataset.id
            }
          })

          if(!first_image.dataValues.Images.length){
            thumbnail_image = null;
          }else{
            thumbnail_image = await datauri(first_image.dataValues.Images[0].dataValues.thumbnailPath);
          }

          dataset_arr.push({
            id: _dataset.id,
            src : thumbnail_image,
            title: _dataset.datasetName,
            subtitle: _dataset.description,
          });
        }

        responseHandlerdler.custom(res, 200, {
          "result": "success",
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
        const hashed_id = crypto.createHash("sha256").update(req.session.username + salt).digest("hex");
        user_dataset_path = `${path.storage}/${hashed_id}/${path.dataset}/${req.body.dataset_name}`;

        let result = await models.Dataset.create({
          userID: req.session.userID,
          datasetName: req.body.dataset_name,
          datasetPath: user_dataset_path,
          description: req.body.description
        }, {
          transaction
        });

        fs.mkdir(user_dataset_path, (err) => {
          fsp.mkdir(`${user_dataset_path}/original`);
          fsp.mkdir(`${user_dataset_path}/thumbnail`);
        });
        await transaction.commit();
        let datasetid = result.dataValues.id;
        responseHandlerdler.custom(res, 200, {
          "result": "success",
          "dataset_id": datasetid
        });
      }
    } catch (err) {
      if (user_dataset_path) {
        fs.access(user_dataset_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(user_dataset_path);
          }
        }));
      }
      if(transaction) {
        transaction.rollback();
      }
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
      //FIX: null type check
      if(transaction) {
        transaction.rollback();
      }
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
        //throw { status: 400, message: '잘못 된 접근입니다'}
      } else if (await models.Dataset.findOne({ where: { userID: req.session.userID, datasetName: req.body.after } })) {
        transaction.rollback();
        responseHandlerdler.fail(res, 409, "중복된 이름입니다");
      } else {
        const hashed_id = crypto.createHash("sha256").update(req.session.username + salt).digest("hex");
        const after_dataset_name = req.body.after;

        before_dataset_path = before_dataset.dataValues.datasetPath;
        after_dataset_path = `${path.storage}/${hashed_id}/${path.dataset}/${after_dataset_name}`;

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
      //FIX: null type check
      if(transaction) {
        transaction.rollback();
      }
      responseHandlerdler.fail(res, 500, "처리 실패");
    }
  }
};