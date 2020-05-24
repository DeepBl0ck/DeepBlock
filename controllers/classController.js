'use strict';

// modules
const fs              = require('fs');
const fsp             = require('fs').promises;
const rimraf          = require('rimraf');
// models - DB        
const models          = require("../models");
// utils
const responseHandler = require('../utils/responseHandler');

module.exports = {
  loadClassOfDataset(req, res) {
    models.Dataset.findAll({
      include: [{
        model: models.Class
      }],
      where: {
        userID: req.session.userID,
        id: req.params.dataset_id
      }
    })
    .then((dataset_info => {
      let class_list = dataset_info[0].dataValues.Classes;

      if (!class_list.length) {
        responseHandler.custom(res, 200, {
          "result": "success",
          "class_num": 0,
          "class_list": {}
        });
      } else {
        let class_arr = [];

        for (var _class of class_list) {
          _class = _class.dataValues;
          class_arr.push({
            class_id: _class.id,
            class_name: _class.className,
            image_num: _class.image_num
          });
        }
        responseHandler.custom(res, 200, {
          "result": "success",
          "class_num": class_arr.length,
          "class_list": class_arr
        });
      }
    }))
    .catch((err) => {
      responseHandler.fail(res, 500, "처리 실패");
    })
  },

  async createClass(req, res) {
    let original_path = null;
    let thumbnail_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const dataset_class = await models.Dataset.findOne({
        include: [{
          model: models.Class,
          where: { className: req.body.class_name }
        }],
        where: {
          id: req.params.dataset_id,
        }
      });

      if (dataset_class) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 이름입니다");
      } else {
        const dataset_info = await models.Dataset.findOne({ where: { userID: req.session.userID, id: req.params.dataset_id } });

        original_path = `${dataset_info.dataValues.datasetPath}/original/${req.body.class_name}`;
        thumbnail_path = `${dataset_info.dataValues.datasetPath}/thumbnail/${req.body.class_name}`;

        await models.Class.create({
          datasetID: req.params.dataset_id,
          className: req.body.class_name,
          imageCount: 0,
          originalPath: original_path,
          thumbnailPath: thumbnail_path
        }, {
          transaction
        });

        fsp.mkdir(original_path);
        fsp.mkdir(thumbnail_path);
        await transaction.commit();
        responseHandler.success(res, 200, "생성 성공");
      }
    } catch (err) {
      if (original_path || thumbnail_path) {
        fs.access(original_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(original_path);
          }
        }));
        fs.access(thumbnail_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(thumbnail_path);
          }
        }));
      }
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async deleteClass(req, res) {
    let original_path = null;
    let thumbnail_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const dataset_class = await models.Dataset.findOne({
        include: [{
          model: models.Class,
          where: { id: req.params.class_id }
        }],
        where: {
          userID: req.session.userID,
          id: req.params.dataset_id
        }
      });

      if (!dataset_class) {
        transaction.rollback();
        responseHandler.fail(res, 400, "잘못 된 접근입니다");
      } else {
        original_path = dataset_class.dataValues.Classes[0].dataValues.originalPath;
        thumbnail_path = dataset_class.dataValues.Classes[0].dataValues.thumbnailPath;

        await models.Class.destroy({
          where: {
            datasetID: req.params.dataset_id,
            id: req.params.class_id,
            originalPath: original_path,
            thumbnailPath: thumbnail_path
          }
        }, {
          transaction
        });

        rimraf(original_path, ((err) => { }));
        rimraf(thumbnail_path, ((err) => { }));
        await transaction.commit();
        responseHandler.success(res, 200, "삭제 성공");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async updateClassName(req, res) {
    let before_original_path = null;
    let before_thumbnail_path = null;
    let after_original_path = null;
    let after_thumbnail_path = null;

    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const before_class = await models.Dataset.findOne({
        include: [{
          model: models.Class,
          where: { id: req.params.class_id }
        }],
        where: {
          id: req.params.dataset_id
        }
      });
      const after_class = await models.Dataset.findOne({
        include: [{
          model: models.Class,
          where: { className: req.body.after }
        }],
        where: {
          id: req.params.dataset_id
        }
      });

      if (!before_class) {
        transaction.rollback();
        responseHandler.fail(res, 400, "잘못 된 접근입니다");
      } else if (after_class) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 이름입니다");
      } else {
        const after_class_name = req.body.after;
        
        before_original_path = before_class.dataValues.Classes[0].dataValues.originalPath;
        before_thumbnail_path = before_class.dataValues.Classes[0].dataValues.thumbnailPath;
        after_original_path = `${before_class.dataValues.datasetPath}/original/${after_class_name}`;
        after_thumbnail_path = `${before_class.dataValues.datasetPath}/thumbnail/${after_class_name}`;

        await models.Class.update({
          className: after_class_name,
          originalPath: after_original_path,
          thumbnailPath: after_thumbnail_path
        }, {
          where: {
            datasetID: req.params.dataset_id,
            id: req.params.class_id,
            originalPath: before_original_path,
            thumbnailPath: before_thumbnail_path
          }
        }, {
          transaction
        });

        fsp.rename(before_original_path, after_original_path);
        fsp.rename(before_thumbnail_path, after_thumbnail_path);
        await transaction.commit();
        responseHandler.success(res, 200, "이름변경 성공");
      }
    } catch (err) {
      if (after_original_path || after_thumbnail_path) {
        fs.access(after_original_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            fsp.rename(after_original_path, before_original_path);
          }
        }));
        fs.access(after_thumbnail_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            fsp.rename(after_thumbnail_path, before_thumbnail_path);
          }
        }));
      }
      
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  }
}