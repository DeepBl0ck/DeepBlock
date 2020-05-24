'use strict'

// module
const express        = require('express');
const routes         = express.Router({mergeParams: true});
// router
const userRouter     = require('./users');
const projectRouter  = require('./projects');
const datasetRouter  = require('./dataset');

routes.use('/api', userRouter);
routes.use('/api/u/projects', projectRouter);
routes.use('/api/u/dataset', datasetRouter);

routes.get('/', function(req, res){
    res.status(200).send('DeepBlock : GUI based deep learning service');
})

module.exports = routes;
