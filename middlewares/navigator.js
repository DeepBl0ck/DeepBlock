/*===================================
  Get path where data will be saved 
====================================*/
"use strict";

const crypto = require("crypto");
const models = require("@models");
const path = require("@config/path");
const responseHandler = require("@utils/responseHandler");
const salt = process.env.SALT;

module.exports = {
  image(req, res, next) {
    models.Dataset.findOne({
      include: [
        {
          model: models.Class,
          where: { id: req.params.class_id },
        },
      ],
      where: {
        id: req.params.dataset_id,
      },
    })
      .then((exist) => {
        if (exist) {
          req.dataset_path = exist.dataValues.datasetPath;
          req.original_path =
            exist.dataValues.Classes[0].dataValues.originalPath;
          req.thumbnail_path =
            exist.dataValues.Classes[0].dataValues.thumbnailPath;

          return next();
        } else {
          responseHandler.fail(res, 403, "Wrong approach");
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  avatar(req, res, next) {
    const hashed_id = crypto
      .createHash("sha256")
      .update(req.session_name + salt)
      .digest("hex");
    req.profile_path = `${path.storage}/${hashed_id}/${path.profile}/`;
    req.profile_name = req.session_name;

    return next();
  },
};
