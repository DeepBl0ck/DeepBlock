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
 
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 
 *   
 *    responses:
 *        200:
 *            description: In case of success viewing a class list 
 *            schema:
 *                type: object
 *                properties:
 *                    id:
 *                       type: string
 *                    name:
 *                         type: string         
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
 
 *    responses:
 *        200:
 *            description: In case of success creating a class
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
 *            description: In case of existing a class name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicate class name 
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
*            description: In case of success deleting a class
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
*            description: In case of doesn't exist a session 
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
 
 *   
 *    responses:
 *        200:
 *            description: In case of success changing a class name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Rename completed
 *        401:
 *            description: In case of don't match class_id or dataset_id
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
 *            description: In case of existing a duplicate class name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicate class name
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

module.exports = classes;