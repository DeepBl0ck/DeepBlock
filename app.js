'use strict'
require('module-alias/register');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const cors = require('cors');
const sequelize = require('./models').sequelize;
const responseHandler = require('@utils/responseHandler');
const routes = require('@routes');

/*============================
      Init express server
============================*/
const app = express();
sequelize.sync();

const redis_client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt( process.env.REDIS_PORT )
});
const sess = {
  key: 'sid',
  resave: false,
  secret: 'secret',
  saveUninitialized: true,
  store: new redisStore({
    client: redis_client
  }),
  cookie: {
    httpOnly: true,
    maxAge: 24000 * 60 * 60
  }
};
app.use(session(sess));
app.use(bodyParser.json());
// set cors
app.use(cors({
  origin: true,
  credentials: true
}))

/*==============================
      Request API - route
==============================*/
app.use('/api', routes);


/*============================
      Error handling
============================*/
app.use(function (req, res, next) {
  responseHandler.fail(res, 404, '404 Not found TT');
});


/*=============================
      Listening
=============================*/
app.listen(process.env.SERVER_PORT || '8000', function (req, res) {
  console.log('listening on port 8000');
});


