/*============================
      check user's input
============================*/
'use strict'

var { check, validationResult } = require('express-validator');

const sanitizer = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log("sanitizer failed");
    return res.status(403).json({
      success: false,
      message: errors
    });
  } 
  console.log("sanitizer success");
  return next();
};

module.exports = sanitizer;