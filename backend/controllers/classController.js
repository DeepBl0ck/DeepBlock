"use strict";

const fs = require("fs");
const fsp = require("fs").promises;
const rimraf = require("rimraf");
const models = require("../models");
const responseHandler = require("@utils/responseHandler");

module.exports = {
  loadClassOfDataset(req, res) {
    models.Dataset.findAll({
      include: [
        {
          model: models.Class,
        },
      ],
      where: {
        userID: req.session_id,
        id: req.params.dataset_id,
      },
    })
      .then((dataset_info) => {
        let class_list = dataset_info[0].dataValues.Classes;

        if (!class_list.length) {
          responseHandler.custom(res, 200, {
            result: "success",
            class_info: {},
          });
        } else {
          let class_arr = [];

          for (var _class of class_list) {
            _class = _class.dataValues;
            class_arr.push({
              id: _class.id,
              name: _class.className,
              count: _class.imageCount
            });
          }
          responseHandler.custom(res, 200, {
            result: "success",
            class_info: class_arr,
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async createClass(req, res) {
    let origin_path = null;
    let thumb_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const dataset_class = await models.Dataset.findOne({
        include: [
          {
            model: models.Class,
            where: { className: req.body.class_name },
          },
        ],
        where: {
          id: req.params.dataset_id,
        },
      });

      if (dataset_class) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicate name");
      } else {
        const dataset_info = await models.Dataset.findOne({
          where: { userID: req.session_id, id: req.params.dataset_id },
        });

        origin_path = `${dataset_info.dataValues.datasetPath}/original/${req.body.class_name}`;
        thumb_path = `${dataset_info.dataValues.datasetPath}/thumbnail/${req.body.class_name}`;

        let result = await models.Class.create({
          datasetID: req.params.dataset_id,
          className: req.body.class_name,
          imageCount: 0,
          originalPath: origin_path,
          thumbnailPath: thumb_path,
        }, {
          transaction
        });

        fsp.mkdir(origin_path);
        fsp.mkdir(thumb_path);
        await transaction.commit();
        let class_id = result.dataValues.id;
        responseHandler.custom(res, 200, {
          result: "success",
          class_id: class_id,
        });
      }
    } catch (err) {

      if (origin_path || thumb_path) {
        fs.access(origin_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(origin_path);
          }
        }));
        fs.access(thumb_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(thumb_path);
          }
        }));
      }
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async deleteClass(req, res) {
    let origin_path = null;
    let thumb_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const dataset_class = await models.Dataset.findOne({
        include: [
          {
            model: models.Class,
            where: { id: req.params.class_id },
          },
        ],
        where: {
          userID: req.session_id,
          id: req.params.dataset_id,
        },
      });

      if (!dataset_class) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Wrong approach");
      } else {
        origin_path = dataset_class.dataValues.Classes[0].dataValues.originalPath;
        thumb_path = dataset_class.dataValues.Classes[0].dataValues.thumbnailPath;

        await models.Class.destroy({
          where: {
            datasetID: req.params.dataset_id,
            id: req.params.class_id,
            originalPath: origin_path,
            thumbnailPath: thumb_path
          }
        }, {
          transaction
        });
        rimraf(origin_path, ((err) => { }));
        rimraf(thumb_path, ((err) => { }));
        await transaction.commit();
        responseHandler.success(res, 200, "Delete success");
      }
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async updateClassName(req, res) {
    let before_origin_path = null;
    let before_thumb_path = null;
    let after_origin_path = null;
    let after_thumb_path = null;

    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const before_class = await models.Dataset.findOne({
        include: [
          {
            model: models.Class,
            where: { id: req.params.class_id },
          },
        ],
        where: {
          id: req.params.dataset_id,
        },
      });
      const after_class = await models.Dataset.findOne({
        include: [
          {
            model: models.Class,
            where: { className: req.body.after },
          },
        ],
        where: {
          id: req.params.dataset_id,
        },
      });

      if (!before_class) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Wrong approach");
      } else if (after_class) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicate success");
      } else {
        const after_class_name = req.body.after;

        before_origin_path = before_class.dataValues.Classes[0].dataValues.originalPath;
        before_thumb_path = before_class.dataValues.Classes[0].dataValues.thumbnailPath;
        after_origin_path = `${before_class.dataValues.datasetPath}/original/${after_class_name}`;
        after_thumb_path = `${before_class.dataValues.datasetPath}/thumbnail/${after_class_name}`;

        await models.Class.update({
          className: after_class_name,
          originalPath: after_origin_path,
          thumbnailPath: after_thumb_path
        }, {
          where: {
            datasetID: req.params.dataset_id,
            id: req.params.class_id,
            originalPath: before_origin_path,
            thumbnailPath: before_thumb_path
          },
        },
          {
            transaction,
          }
        );

        fsp.rename(before_origin_path, after_origin_path);
        fsp.rename(before_thumb_path, after_thumb_path);
        await transaction.commit();
        responseHandler.success(res, 200, "Rename class");
      }
    } catch (err) {
      if (after_origin_path || after_thumb_path) {
        fs.access(after_origin_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            fsp.rename(after_origin_path, before_origin_path);
          }
        }));
        fs.access(after_thumb_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            fsp.rename(after_thumb_path, before_thumb_path);
          }
        }));
      }

      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },
};
