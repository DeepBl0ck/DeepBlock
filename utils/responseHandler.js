/*============================
      Response handling
============================*/
'use strict'

module.exports = {
  /*
      non-blocking respone handler
  */
  //success
  success(res, status, msg) {
    res.status(status).json({
      result: "success",
      message: msg
    });
  },

  //failed
  fail(res, status, msg) {
    res.status(status).json({
      result: "fail",
      message: msg
    });
  },

  //custom
  custom(res, status, custom_json) {
    res.status(status).json(custom_json);
  },

  /*
      async respone handler
  */
  promises: {
    async success(res, status, msg) {
      return new Promise((resolve) => {
        res.status(status).json({
          result: "success",
          message: msg
        });
        resolve();
      })
    },

    //failed
    async fail(res, status, msg) {
      return new Promise((resolve) => {
        res.status(status).json({
          result: "fail",
          message: msg
        });
        resolve();
      })
    },

    //custom response
    async custom(res, status, custom_json) {
      return new Promise((resolve) => {
        res.status(status).json(custom_json);
        resolve();
      })
    }
  }
}