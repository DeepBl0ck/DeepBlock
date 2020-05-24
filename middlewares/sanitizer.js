/*============================
      check user's input
============================*/
'use strict'

var { check, validationResult } = require('express-validator');

const sanitizer = (req, res, next) => {
  const errors = validationResult(req);

  const p = new Promise(
    (resolve, reject) => {
      console.log(errors);
      if (!errors.isEmpty()) {
        reject(errors);
      }
      resolve();
    }
  )
  p.then(() => {
    console.log("sanitizer success");
    next();
  })
    .catch(function (errors) {
      console.log("sanitizer failed");
      res.status(403).json({
        success: false,
        message: errors
      });
    });
};

module.exports = sanitizer;