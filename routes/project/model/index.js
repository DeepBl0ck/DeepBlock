'use strict'

const express = require('express');
const model = express.Router({ mergeParams: true });
const modelController = require('@controllers/modelController');
const sanitizer = require('@middlewares/sanitizer');

/* ==== modelControllers ==== */
// model load & update
model.get('/', sanitizer.isProjectID, modelController.loadModelOfProject);
model.put('/', sanitizer.isProjectID, modelController.updateModel);

// // load train result & test result
model.get('/train', sanitizer.isProjectID, modelController.trainResult);
model.get('/test', sanitizer.isProjectID, sanitizer.isDatasetID, modelController.testResult);

// // model train & test
model.post('/train', sanitizer.isProjectID, sanitizer.isDatasetID, modelController.trainModel);
model.post('/test', sanitizer.isProjectID, sanitizer.isDatasetID, sanitizer.isSaveOption, modelController.testModel);
module.exports = model;
