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
 *        name: user session ID
 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *   
 *    responses:
 *        200:
 *            description: In case of success loading a model
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
 *            description: In case of doesn't exist session
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
 *        name: user session ID
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *   
 *    responses:
 *        200:
 *            description: In case of success saving a model infomation
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  message:
 *                        type: string
 *                        example: Saved success
 *        401:
 *            description: In case of doesn't exist session
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
 *        name: user session ID
 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *   
 *    responses:
 *        200-1:
 *            description: The result of model learning
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
 *            description: The result of model learning
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
 *        500-2:
 *            description: In case of doesn't exist a results
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: No results
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
 *        name: user session ID
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 *   
 *    responses:
 *        200:
 *            description: The result of model test
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
 *            description: In case of doesn't exist learning results
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: No learning results
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

// // model train & test

model.get('/test/:test_id/prediction', sanitizer.isProjectID, sanitizer.isTestID, sanitizer.isOffset, sanitizer.isType, modelController.predictResult);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id/model/test/:test_id/prediction:
 *  get:
 *    tags:
 *      - modelController
 *    description: 모델 테스트 결과
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: test_id
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: offset
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: type
 *   
 *    responses:
 *        200:
 *            description: The result of model prediction
 *            schema:
 *                type: object
 *                properties:
 *                  result:
 *                        type: string
 *                        example: success
 *                  res_json:
 *                        type: string
 *                        example: res_json
 *        403-1:
 *            description: In case of doesn't exist data
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        403-2:
 *            description: In case of refering to another user's table
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
 *        name: user session ID
 * 
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 * 
 *      - in: body
 *        type: int
 *        required: true
 *        name: dataset_id
 * 
 *      - in: body
 *        type: int
 *        required: true
 *        name: epochs
 * 
 *      - in: body
 *        type: int
 *        required: true
 *        name: batches
 * 
 *      - in: body
 *        type: int
 *        required: true
 *        name: val_per
 * 
 *   
 *    responses:
 *        200:
 *            description: In case of success creating a project
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    Start model learning:
 *                        type: int
 *                        example: Start model learning
 *        403-1:
 *            description: In case of doesn't exist project
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        403-2:
 *            description: In case of doesn't exitst learning data
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: No learning data
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
 
 *      - in: body
 *        type: boolean
 *        required: true
 *        name: save_option
 *   
 *    responses:
 *        200:
 *            description: In case of success model test
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
 *            description: In case of doesn't exist learning results
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: No learning results
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

module.exports = model;
