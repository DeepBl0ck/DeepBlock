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
project.post('/', sanitizer.createProject, projectController.createProject);
project.delete('/:project_id', sanitizer.deleteProject, projectController.deleteProject);
project.put('/:project_id', sanitizer.updateProjectName, projectController.updateProjectName);

module.exports = project;
