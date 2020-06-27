'use strict'

const express = require('express');
const image = express.Router({ mergeParams: true });
const multer = require('multer');
const imageController = require('@controllers/imageController');
const imageNavigator = require('@middlewares/navigator').image;
const sanitizer = require('@middlewares/sanitizer');

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
image.get('/', sanitizer.isClassID, sanitizer.isLimit, sanitizer.isOffset, imageController.sendClassImage);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class/:class_id/image?limit=?&page=?:
 *  get:
 *    tags:
 *      - imageController
 *    description: load image list
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: class_id
 
 *      - in: query
 *        type: string
 *        required: true
 *        name: limit
 
 *      - in: query
 *        type: string
 *        required: true
 *        name: page
 
 *   
 *    responses:
 *        200:
 *            description: In case of success sending a class image
 *            schema:
 *                type: object
 *                properties:
 *                    image_list:
 *                        type: string
 *                        example: image_list       
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
image.post('/', sanitizer.isClassID, imageNavigator, image_upload.any(), imageController.uploadImage);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class/:class_id/image:
 *  post:
 *    tags:
 *      - imageController
 *    description: upload class
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: class_id
 
 *    responses:
 *        200:
 *            description: In case of success uploading a image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Upload success
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
image.delete('/:image_id', sanitizer.isClassID, sanitizer.isImageID, imageController.deleteImage);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class/:class_id/image/:image_id:
 *  delete:
 *    tags:
 *      - imageController
 *    description: delete image 
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: class_id
 
 *      - in: path
 *        type: int
 *        required: true
 *        name: image_id
 
 *      - in: body
 *        type: string
 *        required: true
 *        name: image_name
 
 *   
 *    responses:
 *        200:
 *            description: In case of success deleting a image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Delete success
 *        401:
 *            description: In case of doesn't exist image or class_id
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */
image.get('/:image_id', sanitizer.isClassID, imageController.sendOrigianlImage);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class/:class_id/image/:image_id:
 *  get:
 *    tags:
 *      - imageController
 *    description: update image name
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: class_id
 
 *      - in: path
 *        type: int
 *        required: true
 *        name: image_id
 
 *      - in: path
 *        type: int
 *        required: true
 *        name: dataset_id
 *   
 *   
 *    responses:
 *        200:
 *            description: In case of success sending a original image
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    image_uri:
 *                        type: string
 *                        example: image_uri
 *        401:
 *            description: In case of don't match class_id or dataset_id or image_id
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        500:
 *            description: In case of server error
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Processing fail
 */

module.exports = image;