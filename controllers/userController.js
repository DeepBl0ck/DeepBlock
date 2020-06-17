"use strict";

const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs").promises;
const rimraf = require("rimraf");
const datauri = require("datauri");
const models = require("../models");
const responseHandler = require("@utils/responseHandler");
const smtpHandler = require("@utils/smtpHandler");
const path = require("@config/path");
const server = require("@config/server");
const jwt = require('jsonwebtoken');
const salt = process.env.SALT;
const secret_key = process.env.SECRET_KEY;

module.exports = {
  async register(req, res) {
    let userdir = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      let user_check = [];

      //TODO: optimize sequelize query - check
      user_check.push(
        await models.User.findOne({
          where: {
            username: req.body.username,
          },
        })
      );
      user_check.push(
        await models.User.findOne({
          where: {
            email: req.body.email,
          },
        })
      );

      if (user_check[0]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicated userID");
      } else if (user_check[1]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicated email");
      } else {
        const hashed_id = crypto
          .createHash("sha256")
          .update(req.body.username + salt)
          .digest("hex");
        const hashed_password = crypto
          .createHash("sha256")
          .update(req.body.password + salt)
          .digest("hex");
        const verifyKey = crypto.randomBytes(16).toString("hex");

        userdir = `${path.storage}/${hashed_id}`;

        await models.User.create(
          {
            username: req.body.username,
            email: req.body.email,
            password: hashed_password,
            avatar: null,
            verifyKey: verifyKey,
          },
          {
            transaction,
          }
        );

        fs.mkdirSync(userdir);
        fs.mkdirSync(`${userdir}/${path.project}`);
        fs.mkdirSync(`${userdir}/${path.dataset}`);
        fs.mkdirSync(`${userdir}/${path.profile}`);

        const url =
          "http://" +
          `${server.ip}:${server.port}` +
          "/api/verifyEmail?key=" +
          `${verifyKey}`;

        smtpHandler.mail(req.body.email, url);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "Sign up success - Please verify your email"
        );
      }
    } catch (err) {
      if (userdir) {
        fs.access(userdir, fs.constants.F_OK, (e) => {
          if (!e) {
            rimraf.sync(userdir);
          }
        });
      }
      //FIX: null type check
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async unregister(req, res) {
    let transaction = null;
    const hashed_id = crypto
      .createHash("sha256")
      .update(req.session_id + salt)
      .digest("hex");
    const hashed_password = crypto
      .createHash("sha256")
      .update(req.body.password + salt)
      .digest("hex");

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({
        where: {
          username: req.session_id,
          password: hashed_password,
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 403, "Password error");
      } else {
        await models.User.destroy(
          {
            where: {
              id: req.session_id,
              username: req.session_name,
              password: hashed_password,
            },
          },
          {
            transaction,
          }
        );

        rimraf.sync(`${path.storage}/${hashed_id}`);
        transaction.commit();
        responseHandler.success(res, 200, "Membership withdrawal success");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  login(req, res) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    models.User.findOne({
      where: {
        username: req.body.username,
        password: crypto
          .createHash("sha256")
          .update(req.body.password + salt)
          .digest("hex"),
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "UserID or Password error");
        } else if (user.dataValues.isVerify === false) {
          responseHandler.fail(res, 401, "Email authentication required");
        } else {
          const hashed_ip = crypto.createHash("sha256").update(ip + salt).digest("hex");
          const p = new Promise(
            (resolve, reject) => {
              jwt.sign(
                {
                  userid: user.dataValues.id,
                  username: user.dataValues.username,
                  email: user.dataValues.email,
                  credential: hashed_ip
                },
                secret_key,
                {
                  expiresIn: '30m',
                  subject: 'userInfo'
                }, (err, token) => {
                  if (err) {
                    reject(err)
                  }
                  resolve(token)
                })
            })
          p.then((token) => {
            responseHandler.custom(res, 200, {
              result: "success",
              message: "Loginable",
              token: token
            })
          })
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async findID(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Email doesn't match");
      } else {
        smtpHandler.id(user.dataValues.email, user.dataValues.username);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "Finding userID success - Please check your email"
        );
      }
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async findPassword(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      let user = await models.User.findOne({
        where: {
          username: req.body.username,
          email: req.body.email,
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 403, "UserID or Email doesn't match");
      } else {
        const temp_pw = crypto.randomBytes(8).toString("hex");

        await models.User.update(
          {
            password: crypto
              .createHash("sha256")
              .update(temp_pw + salt)
              .digest("hex"),
          },
          {
            where: {
              username: user.dataValues.username,
              email: user.dataValues.email,
            },
          },
          {
            transaction,
          }
        );
        smtpHandler.password(user.dataValues.email, temp_pw);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "Finding password success - Please check your email"
        );
      }
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  viewProfile(req, res) {
    models.User.findOne({
      where: {
        id: req.session_id,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          responseHandler.custom(res, 200, {
            username: user.username,
            email: user.email,
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  viewProfileImage(req, res) {
    models.User.findOne({
      where: {
        id: req.session_id,
      },
    })
      .then(async function (user) {
        if (!user) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          if (user.avatar === null) {
            let basic_image_uri = await datauri("./public/DeepBlock.png");
            responseHandler.custom(res, 200, {
              result: "success",
              avatar: basic_image_uri,
            });
          } else {
            let image_uri = await datauri(user.dataValues.avatar);
            responseHandler.custom(res, 200, {
              result: "success",
              avatar: image_uri,
            });
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async changeAvatar(req, res) {
    let transaction = null;
    try {
      transaction = await models.sequelize.transaction();
      let user = await models.User.findOne({
        where: {
          id: req.session_id,
        },
      });

      if (!user) {
        responseHandler.fail(res, 401, "Wrong approach");
      } else {
        let after_profile_path = req.file.path;
        await models.User.update(
          {
            avatar: after_profile_path,
          },
          {
            where: {
              username: req.session_name,
            },
          },
          {
            transaction,
          }
        );
      }
      let before_profile_path = user.dataValues.avatar;
      if (before_profile_path) {
        fsp.unlink(before_profile_path);
      }

      transaction.commit();
      responseHandler.success(res, 200, "Upload profile image success");
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async deleteAvater(req, res) {
    let transaction = "";

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({
        where: {
          id: req.session_id,
        },
      });

      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Wrong approach");
      } else {
        await models.User.update(
          {
            avatar: null,
          },
          {
            where: {
              username: req.session_name,
            },
          },
          {
            transaction,
          }
        );

        let profile_path = user.dataValues.avatar;
        if (profile_path) {
          fsp.unlink(profile_path);
        }

        await transaction.commit();
        responseHandler.success(res, 200, "Delete profile success");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  checkPassword(req, res) {
    const password_verify = crypto
      .createHash("sha256")
      .update(req.body.password_verify + salt)
      .digest("hex");

    models.User.findOne({
      where: {
        id: req.session_id,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          const user_password = user.dataValues.password;
          if (user_password !== password_verify) {
            responseHandler.fail(res, 403, "Password doesn't match");
          } else {
            responseHandler.success(res, 200, "Identification completed");
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async changePassword(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const after_password = req.body.after_password;
      const after_password_verify = req.body.after_password_verify;
      const after_hash_password = crypto
        .createHash("sha256")
        .update(after_password + salt)
        .digest("hex");

      let user = await models.User.findOne({
        where: {
          id: req.session_id,
        },
      });

      if (after_password !== after_password_verify) {
        responseHandler.fail(res, 403, "Entered the wrong password");
      } else if (after_hash_password === user.dataValues.password) {
        responseHandler.fail(res, 403, "Can't change same password");
      } else {
        await models.User.update(
          {
            password: after_hash_password,
          },
          {
            where: {
              username: req.session_name,
            },
          },
          {
            transaction,
          }
        );

        await transaction.commit();
        responseHandler.success(res, 200, "Password change completed");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  verifyEmail(req, res) {
    models.User.update(
      {
        isVerify: true,
      },
      {
        where: {
          verifyKey: req.query.key,
        },
      }
    )
      .then((user) => {
        if (!user[0]) {
          responseHandler.fail(res, 409, "Authentication key error");
        } else {
          responseHandler.success(
            res,
            200,
            "Authentication success - Loginable"
          );
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },
};
