'use strict'

// module
const express         = require('express');
const image           = express.Router({mergeParams: true});
const multer          = require('multer');
// controller
const imageController = require('../../../../controllers/imageController');
// middleware
const imageNavigator  = require('../../../../middlewares/navigator').image;

// Init multer - for image upload
const image_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `${req.original_path}/`;
    cb(null, path);
  },
  filename: function (req, file, cb) {
    let filename = `${new Date().valueOf()}_${file.originalname}`;
    cb(null, filename);
  }
})
const image_upload = multer({
  storage: image_storage
});


/* ==== imageController ==== */
image.get('/', imageController.sendClassImage);
image.post('/', imageNavigator, image_upload.any(), imageController.uploadImage);
image.delete('/:image_id', imageController.deleteImage);
image.get('/:image_id', imageController.sendOrigianlImage);

module.exports = image;