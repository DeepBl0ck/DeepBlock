'use strict'

// module
const express           = require('express');
const dataset           = express.Router({mergeParams: true});
const classRouter       = require('./classes');
// controller
const datasetController = require('../../controllers/datasetController');
// middleware
const authenticator     = require('../../middlewares/authenticator');

dataset.use(authenticator);
dataset.use('/:dataset_id/class', classRouter)


/* ==== dataControllers ==== */
// CRUD
dataset.get('/', datasetController.viewDatasetList);
dataset.post('/', datasetController.createDataset);
dataset.delete('/:dataset_id', datasetController.deleteDataset);
dataset.put('/:dataset_id', datasetController.updateDatasetName);

module.exports = dataset;