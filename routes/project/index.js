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
project.post('/', sanitizer.isProjectName, sanitizer.isDescription, projectController.createProject);
project.delete('/:project_id', sanitizer.isProjectID, projectController.deleteProject);
project.put('/:project_id', sanitizer.isProjectID, sanitizer.isAfter, projectController.updateProjectName);

module.exports = project;
