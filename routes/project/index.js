'use strict'

const express = require('express');
const project = express.Router({ mergeParams: true });
const modelRouter = require('./model');
const projectController = require('@controllers/projectController');
const authenticator = require('@middlewares/authenticator');
const sanitizer = require('@middlewares/sanitizer');

project.use(authenticator);
project.use('/:project_id/model', modelRouter);

/* ==== projectControllers ==== */
// CRUD
project.get('/', projectController.viewProjectList);
/**
 * @swagger 
 * 
 * /api/u/project:
 *  get:
 *    tags:
 *      - projectController
 *    description: view project list
 *    parameters:
 *      - in: cookie
 *        type: string
 *        required: true
 *        name: user session ID
 *   
 *    responses:
 *        200:
 *            description: In case of success viewing a project list
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
project.post('/', sanitizer.isProjectName, sanitizer.isDescription, projectController.createProject);
/**
 * @swagger 
 * 
 * /api/u/project:
 *  post:
 *    tags:
 *      - projectController
 *    description: create project
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: project_name

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
 *                    project_id:
 *                        type: int
 *                        example: project_id
 *        409:
 *            description: In case of duplicate project name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: dulicate project name
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
project.delete('/:project_id', sanitizer.isProjectID, projectController.deleteProject);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id:
 *  delete:
 *    tags:
 *      - projectController
 *    description: view project list
 *    parameters:
 *      - in: path
 *        type: int
 *        required: true
 *        name: project_id
 
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
 *                        example: delete success
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
 */
project.put('/:project_id', sanitizer.isProjectID, sanitizer.isAfter, projectController.updateProjectName);
/**
 * @swagger 
 * 
 * /api/u/project/:project_id:
 *  put:
 *    tags:
 *      - projectController
 *    description: update project name
 *    parameters:
 *      - in: body
 *        type: string
 *        required: true
 *        name: after
 *   
 *    responses:
 *        200:
 *            description: In case of success changing a project name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: success
 *                    message:
 *                        type: string
 *                        example: Change project name success
 *        401:
 *            description: In case of don't match session or project_id
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
 *            description: In case of existing a duplicate project name
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: Duplicate project name
 */

module.exports = project;
