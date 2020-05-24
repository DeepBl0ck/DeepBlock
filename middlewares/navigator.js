/*===================================
  Get path where data will bd saved 
====================================*/
'use strict'

//modules
const crypto            = require('crypto');
// models - DB  
const models            = require("../models");
// configs  
const base_path         = require('../config/configs').base_path;
const profile_dir_name  = require('../config/configs').profile_dir_name;
const hash              = require('../config/configs').hash;
const salt              = require('../config/configs').salt;
// utils  
const responseHandler   = require('../utils/responseHandler');

module.exports = {
  image(req, res, next){
    models.Dataset.findOne({
      include: [{
        model: models.Class,
        where: { id: req.params.class_id }
      }],
      where: {
        id: req.params.dataset_id
      }
    }).then((exist) => {
      if (exist) {
        req.dataset_path = exist.dataValues.datasetPath;
        req.original_path = exist.dataValues.Classes[0].dataValues.originalPath;
        req.thumbnail_path = exist.dataValues.Classes[0].dataValues.thumbnailPath;
  
        console.log("navi success");
        next();
      } else {
        console.log("navi failed");
        responseHandler.fail(res, 400, "잘못 된 접근")
      }
    }).catch((err) => {
      console.log(err);
      responseHandler.fail(res, 500, "처리 실패");
    })
  },

  avatar(req, res, next){
    const hashId = crypto.createHash(hash).update(req.session.username + salt).digest("hex");
    req.user_path = `${base_path}/${hashId}/${profile_dir_name}/`;
    req.profile_name = req.session.username;
  
    next();
  }
}

