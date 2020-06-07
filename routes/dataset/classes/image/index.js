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
 *        description: 클래스 고유 번호
 *      - in: query
 *        type: string
 *        required: true
 *        name: limit
 *        description: limit
 *      - in: query
 *        type: string
 *        required: true
 *        name: page
 *        description: page
 *   
 *    responses:
 *        200:
 *            description: 클래스 목록 보기 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    image_list:
 *                        type: string
 *                        example: image_list       
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 클래스 고유 번호
 *    responses:
 *        200:
 *            description: 이미지 업로드에 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 업로드 성공
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 클래스 고유 번호
 *      - in: path
 *        type: int
 *        required: true
 *        name: image_id
 *        description: 이미지 고유 번호
 *      - in: body
 *        type: string
 *        required: true
 *        name: image_name
 *        description: 이미지 아이디
 *   
 *    responses:
 *        200:
 *            description: 이미지를 삭제하는데 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: 삭제 성공 
 *        401:
 *            description: 이미지 또는 클래스 고유번호가 없을 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못 된 접근입니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
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
 *        description: 클래스 고유 번호
 *      - in: path
 *        type: int
 *        required: true
 *        name: image_id
 *        description: 이미지 고유 번호
 *      - in: path
 *        type: int
 *        required: true
 *        name: dataset_id
 *        description: 데이터셋 고유 번호
 *   
 *    responses:
 *        200:
 *            description: 클래스 이름을 변경하는데 성공한 경우
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
 *            description: 세션정보 또는 일치하는 데이터셋 고유번호가 없습니다
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못 된 접근입니다
 *        500:
 *            description: 서버에 오류가 생긴경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 처리 실패
 */

module.exports = image;