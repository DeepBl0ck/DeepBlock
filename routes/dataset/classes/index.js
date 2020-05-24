'use strict'

// module
const express           = require('express');
const classes           = express.Router({mergeParams: true});
const imageRouter       = require('./image');
// controller
const classController   = require('../../../controllers/classController');

classes.use('/:class_id/image', imageRouter);

/* ==== classController ==== */
// CRUD
classes.get('/', classController.loadClassOfDataset);
classes.post('/', classController.createClass);
classes.delete('/:class_id', classController.deleteClass);
classes.put('/:class_id', classController.updateClassName);

module.exports = classes;