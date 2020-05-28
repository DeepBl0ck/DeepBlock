'use strict'

const express           = require('express');
const projects          = express.Router({mergeParams: true});
const modelRouter       = require('./model');
const projectController = require('@controllers/projectController');
const authenticator     = require('@middlewares/authenticator');
const sanitizer         = require('@middlewares/sanitizer');

projects.use(authenticator);
projects.use('/:project_id/model', modelRouter);

/* ==== projectControllers ==== */
// CRUD
projects.get('/', projectController.viewProjectList);
projects.post('/', sanitizer.createProject, projectController.createProject);
projects.delete('/:project_id', sanitizer.deleteProject, projectController.deleteProject);
projects.put('/:project_id', sanitizer.updateProjectName, projectController.updateProjectName);

module.exports = projects;
