/*============================
    check user's session
============================*/
"use strict";
const responseHandler = require("@utils/responseHandler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret_key = process.env.SECRET_KEY;
const salt = process.env.SALT;

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token || req.body.token;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const hashed_ip = crypto.createHash("sha256").update(ip + salt).digest("hex");

  if (!token) {
    return responseHandler.fail(res, 403, "No token provided");
  }

  const p = new Promise(
    (resolve, reject) => {
      jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
          reject(err)
        } else {
          if (decoded.credential === hashed_ip) {
            resolve(decoded)
          } else {
            reject();
          }
        }
      })
    }
  )
  p.then((decoded) => {
    req.session_id = decoded.userid
    req.session_name = decoded.username
    next()
  })
    .catch(function (err) {
      responseHandler.fail(res, 403, "Token has expired");
    });
}

module.exports = authMiddleware;

