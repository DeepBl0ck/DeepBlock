'use strict'

const express = require('express');
const dataset = express.Router({ mergeParams: true });
const classRouter = require('./classes');
const datasetController = require('@controllers/datasetController');
const authenticator = require('@middlewares/authenticator');
const sanitizer = require('@middlewares/sanitizer');

dataset.use(authenticator);
dataset.use('/:dataset_id/class', classRouter)


/* ==== dataControllers ==== */
// CRUD
dataset.get('/', datasetController.viewDatasetList);
/**
 * @swagger 
 * 
 * /api/u/dataset:
 *  get:
 *    tags:
 *      - datasetController
 *    description: view dataset list
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 데이터셋 목록 보기 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    id:
 *                       type: string
 *                    src:
 *                        type: string
 *                    name:
 *                         type: string
 *                    description:
 *                                type: string         
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
dataset.post('/', sanitizer.isDatasetName, sanitizer.isDescription, datasetController.createDataset);
/**
 * @swagger 
 * 
 * /api/u/dataset:
 *  post:
 *    tags:
 *      - datasetController
 *    description: create dataset
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: dataset_name
 *        description: 데이터셋 이름
 *      - in: body
 *        type: string
 *        name: description
 *        description: 데이터셋 부가 설명
 *   
 *    responses:
 *        200:
 *            description: 프로젝트를 만드는 데 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    dataset_id:
 *                        type: int
 *                        example: dataset_id
 *        409:
 *            description: 중복된 데이터셋 이름인 경우
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
dataset.delete('/:dataset_id', sanitizer.isDatasetID, datasetController.deleteDataset);
 /**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id:
 *  delete:
 *    tags:
 *      - datasetController
 *    description: delete dataset 
 *    parameters:
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
 *            description: 프로젝트를 삭제하는데 성공한 경우
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
dataset.put('/:dataset_id', sanitizer.isDatasetID, sanitizer.isAfter, datasetController.updateDatasetName);
/**
 * @swagger 
 * 
 * /api/u/dataset/:dataset_id:
 *  put:
 *    tags:
 *      - datasetController
 *    description: update dataset name
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: after
 *        description: 변경한 데이터셋 이름
 *   
 *    responses:
 *        200:
 *            description: 데이터셋 이름을 변경하는데 성공한 경우
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
 *            description: 중복된 데이터셋 이름이 있는 경우
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

module.exports = dataset;