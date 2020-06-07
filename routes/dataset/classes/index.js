'use strict'

const express = require('express');
const classes = express.Router({ mergeParams: true });
const imageRouter = require('./image');
const classController = require('@controllers/classController');
const sanitizer = require('@middlewares/sanitizer');

classes.use('/:class_id/image', imageRouter);

/* ==== classController ==== */
// CRUD
classes.get('/', sanitizer.isDatasetID, classController.loadClassOfDataset);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class:
 *  get:
 *    tags:
 *      - classController
 *    description: view class list
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: class_id
 *        description: 클래스 고유 번호
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 클래스 목록 보기 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    id:
 *                       type: string
 *                    name:
 *                         type: string         
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
classes.post('/', sanitizer.isClassName, sanitizer.isDatasetID, classController.createClass);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class:
 *  post:
 *    tags:
 *      - classController
 *    description: create class
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: class_name
 *        description: 클래스 이름   
 *    responses:
 *        200:
 *            description: 클래스를 만드는 데 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    class_id:
 *                        type: int
 *                        example: class_id
 *        409:
 *            description: 중복된 클래스 이름인 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 중복된 이름입니다
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
classes.delete('/:class_id', sanitizer.isClassID, sanitizer.isDatasetID, classController.deleteClass);
/**
* @swagger 
* 
* /api/u/dataset/:dataset_id/class/:class_id:
*  delete:
*    tags:
*      - classController
*    description: delete class 
*    parameters:
*      - in: path
*        type: int
*        required: true
*        name: class_id
*        description: 클래스 고유 번호
*      - in: path
*        type: int
*        required: true
*        name: dataset_id
*        description: 데이터셋 고유 번호
*      - in: cookie
*        type: string
*        required: true
*        name: userID
*        description: 유서 세션 아이디
*   
*    responses:
*        200:
*            description: 클래스를 삭제하는데 성공한 경우
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
*            description: 세션 정보가 없는 경우
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
classes.put('/:class_id', sanitizer.isClassID, sanitizer.isDatasetID, sanitizer.isAfter, classController.updateClassName);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id/class/:class_id:
 *  put:
 *    tags:
 *      - classController
 *    description: update class name
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: after
 *        description: 변경한 데이터셋 이름
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
 *                    message:
 *                        type: string
 *                        example: 이름변경 성공
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
 *        409:
 *            description: 중복된 클래스 이름이 있는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 중복된 이름입니다
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

module.exports = classes;