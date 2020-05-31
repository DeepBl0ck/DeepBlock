/*===================================
  Get path where data will be saved 
====================================*/
'use strict'

const crypto = require('crypto');
const models = require("@models");
const path = require("@config/path")
const responseHandler = require('@utils/responseHandler');
const salt = process.env.SALT;

module.exports = {
  image(req, res, next) {
    models.Dataset.findOne({
      include: [{
        model: models.Class,
        where: { id: req.params.class_id }
      }],
      where: {
        id: req.params.dataset_id
      }
    })
      .then((exist) => {
        if (exist) {
          req.dataset_path = exist.dataValues.datasetPath;
          req.original_path = exist.dataValues.Classes[0].dataValues.originalPath;
          req.thumbnail_path = exist.dataValues.Classes[0].dataValues.thumbnailPath;

          console.log("navi success");
          return next();
        } else {
          console.log("navi failed");
          responseHandler.fail(res, 403, "잘못 된 접근")
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      })
  },

  avatar(req, res, next) {
    const hashed_id = crypto.createHash("sha256").update(req.session.username + salt).digest("hex");
    req.profile_path = `${path.storage}/${hashed_id}/${path.profile}/`;
    req.profile_name = req.session.username;

    return next();
  }
}

