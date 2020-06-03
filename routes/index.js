"use strict";

const express = require("express");
const routes = express.Router({ mergeParams: true });

// router
const userRouter = require("./users");
const projectRouter = require("./project");
const datasetRouter = require("./dataset");

routes.use("/", userRouter);
routes.use("/u/project", projectRouter);
routes.use("/u/dataset", datasetRouter);

routes.get("/", function (req, res) {
  res.status(200).send("DeepBlock : GUI based deep learning service");
});

/*========================test============================ */
routes.get("/session", function (req, res, next) {
  res.status(200).send(req.session);
});
/*======================================================== */

module.exports = routes;
