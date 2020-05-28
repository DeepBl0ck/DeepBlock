'use strict'

const express          = require('express');
const model            = express.Router({mergeParams: true});
const modelController  = require('@controllers/modelController');

/* ==== modelControllers ==== */
// model load & update
model.get('/', modelController.loadModelOfProject);
model.put('/', modelController.updateModel);

// load train result & test result
model.get('/train', modelController.trainResult);
model.get('/test', modelController.testResult);

// model train & test
model.post('/train', modelController.trainModel);
model.post('/test', modelController.testModel);

module.exports = model;
