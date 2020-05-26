'use strict'

// modules
const express         = require('express');
const bodyParser      = require('body-parser');
const session         = require('express-session');
const redis           = require('redis');
const redis_store     = require('connect-redis')(session);
const cors            = require('cors');
// models - DB
const sequelize       = require('./models').sequelize;
// utils
const responseHandler = require('./utils/responseHandler');
// route
const routes          = require('./routes');
// configs
const server_port     = require('./config/configs').server_port;

/*============================
      Init express server
============================*/
// Init Express
const app = express();
app.set('port', parseInt(server_port))
// Init DB squelizer
sequelize.sync();
// Init redis for express-session
const redis_client = redis.createClient(6379, 'localhost');
app.use(cors({
  origin: true,
  credentials: true
}))
// Init session
const sess = {
  key: 'sid',
  resave: false,
  secret: 'secret',
  saveUninitialized: true,
  store: new redis_store({
    client: redis_client
  }),
  cookie: {
    httpOnly: true,
    maxAge: 24000 * 60 * 60
  }
};
app.use(session(sess));

// Set up body-parser
app.use(bodyParser.json());


/*==============================
      Request API - route
==============================*/
// Routing user's request
app.use('/api', routes);


/*============================
      Error handling
============================*/
//404 not found
app.use(function (req, res, next) {
  responseHandler.fail(res, 404, '404 Not found TT');
});


/*=============================
  Listen - port : server_port
=============================*/
app.listen(process.env.PORT || app.get('port') , function (req, res) {
  console.log('listening on port 8000');
});



