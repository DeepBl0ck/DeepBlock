'use strict'

const express = require('express');
const model = express.Router({ mergeParams: true });
const modelController = require('@controllers/modelController');
const sanitizer = require('@middlewares/sanitizer');

/* ==== modelControllers ==== */
// model load & update
model.get('/', sanitizer.isProjectID, modelController.loadModelOfProject);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model:
 *  get:
 *    tags:
 *      - modelController
 *    description: load model info
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *        description: 프로젝트 고유 번호
 *   
 *    responses:
 *        200:
 *            description: 모델 불러오기 성공했을 떄
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  model.json:
 *                        type: string
 *                        example: model.json
 *        401:
 *            description: 세션정보가 없을 때
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
model.put('/', sanitizer.isProjectID, modelController.updateModel);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model:
 *  put:
 *    tags:
 *      - modelController
 *    description: update model info
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *        description: 프로젝트 고유 번호
 *   
 *    responses:
 *        200:
 *            description: 모델 정보 저장하기를 성공했을 떄
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  message:
 *                        type: string
 *                        example: 저장 성공
 *        401:
 *            description: 세션정보가 없을 때
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

// // load train result & test result
model.get('/train', sanitizer.isProjectID, modelController.trainResult);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model/train:
 *  get:
 *    tags:
 *      - modelController
 *    description: train result
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *        description: 프로젝트 고유 번호
 *   
 *    responses:
 *        200-1:
 *            description: 모델 학습 결과
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  message:
 *                        type: string
 *                        example: train_history_json
 *        200-2:
 *            description: 모델 학습 결과
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  message:
 *                        type: string
 *                        example: train_history_json       
 *        500-1:
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
 *        500-2:
 *            description: 결과가 없는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 결과 없음
 */
model.get('/test', sanitizer.isProjectID, modelController.testResult);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model/test:
 *  get:
 *    tags:
 *      - modelController
 *    description: 모델 테스트 결과
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *        description: 프로젝트 고유 번호
 *   
 *    responses:
 *        200:
 *            description: 모델 테스트 결과
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  result_list:
 *                        type: string
 *                        example: result_list
 *        403:
 *            description: 학습 결과가 없는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 학습 결과가 없습니다
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

// // model train & test
model.post('/train', sanitizer.isProjectID, sanitizer.isDatasetID, modelController.trainModel);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model/train:
 *  post:
 *    tags:
 *      - modelController
 *    description: train model
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: userID
 *        description: 유서 세션 아이디
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *        description: 프로젝트 고유 번호
 *      - in: body
 *        type: int
 *        required: true
 *        name: dataset_id
 *        description: 데이터셋 아이디
 *      - in: body
 *        type: int
 *        required: true
 *        name: epochs
 *        description: epochs
 *      - in: body
 *        type: int
 *        required: true
 *        name: batches
 *        description: batches
 *      - in: body
 *        type: int
 *        required: true
 *        name: val_per
 *        description: val_per
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
 *                    모델 학습 시작:
 *                        type: int
 *                        example: 모델 학습 시작
 *        403-1:
 *            description: 프로젝트가 존재하지 않습니다
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 잘못 된 접근입니다
 *        403-2:
 *            description: 학습데이터가 없는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 학습데이터가 없는 경우
 *        403-3:
 *            description: model
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: model
 *        403-4:
 *            description: class_num and output_num missmatched <class_num  ${class_list.length}  your output_num  ${model.output.shape[1]}>
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: class_num and output_num missmatched <class_num  ${class_list.length}  your output_num  ${model.output.shape[1]}>
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
model.post('/test', sanitizer.isProjectID, sanitizer.isDatasetID, sanitizer.isSaveOption, modelController.testModel);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model/test:
 *  post:
 *    tags:
 *      - modelController
 *    description: create project
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: dataset_id
 *        description: 데이터셋 고유번호
 *      - in: body
 *        type: boolean
 *        name: save_option
 *        description: save option
 *   
 *    responses:
 *        200:
 *            description: 모델 테스트를 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    result_json:
 *                        type: int
 *                        example: result_json
 *        403:
 *            description: 학습 결과가 없는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 학습 결과가 없습니다
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

module.exports = model;
