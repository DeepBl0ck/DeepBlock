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
 *        name: user session ID
 *   
 *    responses:
 *        200:
 *            description: In case of success viewing a dataset list
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
 * 
 *      - in: body
 *        type: string
 *        name: description
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
 *                    dataset_id:
 *                        type: int
 *                        example: dataset_id
 *        409:
 *            description: In case of existing a duplicate dataset name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: duplicate dataset name
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

*      - in: cookie
*        type: string
*        required: true
*        name: user session ID
*   
*    responses:
*        200:
*            description: In case of success deleting a project
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
 *   
 *    responses:
 *        200:
 *            description: In case of success changing a dataset name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Rename success
 *        401:
 *            description: In case of don't match session or dataset_id
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Wrong approach
 *        409:
 *            description: In case of existing a duplicate dataset name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicate dataset name 
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

module.exports = dataset;