'use strict'

const express = require('express');
const dataset = express.Router({ mergeParams: true });
const classRouter = require('./classes');
const datasetController = require('@controllers/datasetController');
const authenticator = require('@middlewares/authenticator');
const sanitizer = require('@middlewares/sanitizer');

dataset.use(authenticator);
dataset.use('/:dataset_id/class', classRouter)


/* ==== dataControllers ==== */
// CRUD
dataset.get('/', datasetController.viewDatasetList);
dataset.post('/', sanitizer.isDatasetName, sanitizer.isDescription, datasetController.createDataset);
dataset.delete('/:dataset_id', sanitizer.isDatasetID, datasetController.deleteDataset);
dataset.put('/:dataset_id', sanitizer.isDatasetID, sanitizer.isAfter, datasetController.updateDatasetName);

module.exports = dataset;