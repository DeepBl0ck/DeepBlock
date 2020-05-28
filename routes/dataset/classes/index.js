'use strict'

const express           = require('express');
const classes           = express.Router({mergeParams: true});
const imageRouter       = require('./image');
const classController   = require('@controllers/classController');
const sanitizer         = require('@middlewares/sanitizer');

classes.use('/:class_id/image', imageRouter);

/* ==== classController ==== */
// CRUD
classes.get('/', sanitizer.loadClassOfDataset, classController.loadClassOfDataset);
classes.post('/', sanitizer.createCalss, classController.createClass);
classes.delete('/:class_id', sanitizer.deleteClass, classController.deleteClass);
classes.put('/:class_id', sanitizer.updateClassName, classController.updateClassName);

module.exports = classes;