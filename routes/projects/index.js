'use strict'

const express           = require('express');
const projects          = express.Router({mergeParams: true});
const modelRouter       = require('./model');
const projectController = require('@controllers/projectController');
const authenticator     = require('@middlewares/authenticator');

projects.use(authenticator);
projects.use('/:project_id/model', modelRouter);

/* ==== projectControllers ==== */
// CRUD
projects.get('/', projectController.viewProjectList);
projects.post('/', projectController.createProject);
projects.delete('/:project_id', projectController.deleteProject);
projects.put('/:project_id', projectController.updateProjectName);

module.exports = projects;
