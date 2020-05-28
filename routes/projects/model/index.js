'use strict'

const express          = require('express');
const model            = express.Router({mergeParams: true});
const modelController  = require('@controllers/modelController');
const sanitizer        = require('@middlewares/sanitizer');

/* ==== modelControllers ==== */
// model load & update
model.get('/', sanitizer.loadModelOfProject, modelController.loadModelOfProject);
model.put('/', sanitizer.updateModel, modelController.updateModel);

// load train result & test result
model.get('/train', sanitizer.trainResult, modelController.trainResult);
model.get('/test', sanitizer.testResult, modelController.testResult);

// model train & test
model.post('/train', sanitizer.trainModel, modelController.trainModel);
model.post('/test', sanitizer.testModel, modelController.testModel);

module.exports = model;
