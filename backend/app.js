"use strict";
require("module-alias/register");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, ".env") });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models').sequelize;
const responseHandler = require('@utils/responseHandler');
const routes = require('@routes');


/*============================
      Swagger Definition
============================*/
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDefinition = {
  info: {
    title: "deepblock backend",
    version: "1.0.0",
    description: "deepblock backend api document",
  },
};

const options = {
  swaggerDefinition,
  apis: [
    "./routes/index.js",
    "./routes/users/index.js",
    "./routes/project/index.js",
    "./routes/project/model/index.js",
    "./routes/dataset/index.js",
    "./routes/dataset/classes/index.js",
    "./routes/dataset/classes/image/index.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

/*============================
      Init express server
============================*/
const app = express();
sequelize.sync();


app.use(bodyParser.json());
// set cors
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/*==============================
      Request API - route
==============================*/
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/api", routes);

/*============================
      Error handling
============================*/
app.use(function (req, res, next) {
  responseHandler.fail(res, 404, "404 Not found TT");
});

/*=============================
      Listening
=============================*/
app.listen(process.env.SERVER_PORT || "8000", function (req, res) {
  console.log("listening on port 8000");
});
