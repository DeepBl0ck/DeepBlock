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
 *        name: userID
 *        description: 유서 세션 아이디
 *   
 *    responses:
 *        200:
 *            description: 프로젝트 목록 보기 성공한 경우
 *            schema:
 *                type: object
 *                properties:
 *                    id:
 *                       type: string
 *                    src:
 *                        type: string
 *                        default: null
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
 *        description: 프로젝트 이름
 *      - in: body
 *        type: string
 *        name: description
 *        description: 프로젝트 부가 설명
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
 *                    project_id:
 *                        type: int
 *                        example: project_id
 *        409:
 *            description: 중복된 프로젝트 이름인 경우
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
 *        description: 프로젝트 고유 번호
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
 *        description: 변경한 프로젝트 이름
 *   
 *    responses:
 *        200:
 *            description: 프로젝트 이름을 변경하는데 성공한 경우
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
 *            description: 세션정보 또는 일치하는 프로젝트 고유번호가 없습니다
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
 *            description: 중복된 프로젝트 이름이 있는 경우
 *            schema:
 *                type: object
 *                properties:
 *                    result:
 *                        type: string
 *                        example: fail
 *                    message:
 *                        type: string
 *                        example: 중복된 이름입니다
 */

module.exports = project;
