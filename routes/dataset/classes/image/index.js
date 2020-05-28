'use strict'

const express         = require('express');
const image           = express.Router({mergeParams: true});
const multer          = require('multer');
const imageController = require('@controllers/imageController');
const imageNavigator  = require('@middlewares/navigator').image;
const sanitizer       = require('@middlewares/sanitizer');

// init multer for image upload
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
image.get('/', sanitizer.sendClassImage, imageController.sendClassImage);
image.post('/', sanitizer.uploadImage, imageNavigator, image_upload.any(), imageController.uploadImage);
image.delete('/:image_id', sanitizer.deleteImage, imageController.deleteImage);
image.get('/:image_id', sanitizer.sendOriginalImage, imageController.sendOrigianlImage);

module.exports = image;