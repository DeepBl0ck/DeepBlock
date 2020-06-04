'use strict'

const express = require('express');
const classes = express.Router({ mergeParams: true });
const imageRouter = require('./image');
const classController = require('@controllers/classController');
const sanitizer = require('@middlewares/sanitizer');

classes.use('/:class_id/image', imageRouter);

/* ==== classController ==== */
// CRUD
classes.get('/', sanitizer.isDatasetID, classController.loadClassOfDataset);
classes.post('/', sanitizer.isClassName, sanitizer.isDatasetID, classController.createClass);
classes.delete('/:class_id', sanitizer.isClassID, sanitizer.isDatasetID, classController.deleteClass);
classes.put('/:class_id', sanitizer.isClassID, sanitizer.isDatasetID, sanitizer.isAfter, classController.updateClassName);

module.exports = classes;