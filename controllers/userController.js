'use strict'

//modules
const crypto              = require("crypto");
const fs                  = require('fs');
const fsp                 = require('fs').promises;
const rimraf              = require('rimraf');
const nodemailer          = require('nodemailer');
const smtpTransporter     = require('nodemailer-smtp-transport');
const datauri             = require('datauri');
// models - DB
const models              = require("../models");
// configs
const salt                = require('../config/configs').salt;
const base_path           = require('../config/configs').base_path;
const hash                = require('../config/configs').hash;
const project_dir_name    = require('../config/configs').projects;
const data_dir_name       = require('../config/configs').datasets;
const profile_dir_name    = require('../config/configs').profile_dir_name;
const admin_email         = require('../config/configs').admin_email;
const admin_password      = require('../config/configs').admin_password;
const admin_email_service = require('../config/configs').admin_email_service;
const server_ip           = require('../config/configs').server_ip;
const server_port         = require('../config/configs').server_port;
// utils
const responseHandler     = require('../utils/responseHandler');

module.exports = {
  async register(req, res) {
    let user_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user_check = [];
      user_check.push(await models.User.findOne({ where: { username: req.body.username } }));
      user_check.push(await models.User.findOne({ where: { email: req.body.email } }));

      if (user_check[0]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 아이디 입니다");
      } else if (user_check[1]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 이메일 입니다");
      } else {
        const hashId = crypto.createHash(hash).update(req.body.username + salt).digest("hex");
        const hash_password = crypto.createHash(hash).update(req.body.password + salt).digest("hex");
        const original_key = crypto.randomBytes(256).toString('hex');
        const hash_key = original_key.substr(100, 16) + original_key.substr(50, 16);

        user_path = `${base_path}/${hashId}`;

        await models.User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash_password,
          profile: null,
          verifyKey: hash_key
        }, {
          transaction
        });

        fs.mkdirSync(user_path);
        fsp.mkdir(`${user_path}/${project_dir_name}`);
        fsp.mkdir(`${user_path}/${data_dir_name}`);
        fsp.mkdir(`${user_path}/${profile_dir_name}`);

        const url = "<a href='http://" + `${server_ip}:${server_port}` + "/api/verifyEmail?key=" + `${hash_key}` + "'>verify</a>"
        const mailOptions = {
          from: admin_email,
          to: req.body.email,
          subject: "deepblock - 이메일 인증을 해주세요",
          html: "<h1>이메일 인증을 위해 URL을 클릭해주세요</h1>" + url
        };
        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email_service,
          auth: {
            user: admin_email,
            pass: admin_password
          }
        }));

        smtpTransport.sendMail(mailOptions, (e, info) => {
          if (!e) {
            smtpTransport.close();
          }
        })

        transaction.commit();
        responseHandler.success(res, 200, "회원가입 성공 이메일 인증을 해주세요");
      }
    } catch (err) {
      if (user_path) {
        fs.access(user_path, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(user_path);
          }
        }));
      }

      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async unregister(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({ where: { username: req.session.username, password: hash_password } });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 409, "비밀번호 오류");
      } else {
        const hashId = crypto.createHash(hash).update(req.body.username + salt).digest("hex");
        const hash_password = crypto.createHash(hash).update(req.body.password + salt).digest("hex");

        await models.User.destroy({
          where: {
            id: req.session.userID,
            username: req.session.username,
            password: hash_password
          }
        }, {
          transaction
        });

        rimraf.sync(`${base_path}/${hashId}`);
        transaction.commit();
        responseHandler.success(res, 200, "회원탈퇴 성공");
      }
    } catch {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  login(req, res) {
    const hash_password = crypto.createHash(hash).update(req.body.password + salt).digest("hex");

    models.User.findOne({
      where: {
        username: req.body.username,
        password: hash_password
      }
    }).then((user) => {
      if (!user) {
        responseHandler.fail(res, 409, "아이디 비밀번호 오류");
      } else if (user.dataValues.isVerify === false) {
        responseHandler.fail(res, 403, "이메일 인증필요");
      } else {
        req.session.userID = user.dataValues.id;
        req.session.username = user.dataValues.username;
        responseHandler.success(res, 200, "로그인 성공");
      }
    }).catch(() => {
      responseHandler.fail(res, 500, "처리 실패");
    });
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        responseHandler.fail(res, 409, "로그아웃 실패");
      } else {
        res.clearCookie('sid');
        responseHandler.success(res, 200, "로그아웃 성공");
      }
    });
  },

  async findID(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({ where: { email: req.body.email } });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 409, "등록되지 않은 사용자 입니다");
      } else {
        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email_service,
          auth: {
            user: admin_email,
            pass: admin_password
          }
        }));
        const mailOptions = {
          from: admin_email,
          to: req.body.email,
          subject: "deepblock - 아이디 찾기 결과",
          text: `${user.dataValues.username}`
        };
        smtpTransport.sendMail(mailOptions, (e) => {
          if (!e) {
            smtpTransport.close();
          }
        })

        transaction.commit();
        responseHandler.success(res, 200, "아이디 찾기 성공 - 이메일을 확인해주세요");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async findPassword(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({ where: { username: req.body.username, email: req.body.email } });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 401, "등록되지 않은 사용자 입니다");
      } else {
        const original_key = crypto.randomBytes(256).toString('hex');
        const hash_key = original_key.substr(100, 16) + original_key.substr(50, 16);

        await models.User.update({
          password: crypto.createHash(hash).update(hash_key + salt).digest("hex")
        }, {
          where: { username: user.dataValues.username, email: user.dataValues.email }
        }, {
          transaction
        });

        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email_service,
          auth: {
            user: admin_email,
            pass: admin_password
          }
        }));
        const mailOptions = {
          from: admin_email,
          to: req.body.email,
          subject: "deepblock - 임시 비밀번호",
          text: `${hash_key}`
        };

        smtpTransport.sendMail(mailOptions, (e, info) => {
          if (!e) {
            smtpTransport.close();
          }
        })

        transaction.commit();
        responseHandler.success(res, 200, "비밀 번호 찾기 성공 - 이메일을 확인해주세요");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  viewProfile(req, res) {
    let avatar = null;

    models.User.findOne({
      where: {
        id: req.session.userID
      }
    })
    .then((user_info) => {
      if (!user_info) {
        responseHandler.fail(res, 401, "등록되지 않은 사용자입니다");
      } else {
        if (!user_info.avatar) {
          avatar = "unexist";
        } else {
          avatar = "exist";
        }

        responseHandler.custom(res, 200, {
          "username": user_info.username,
          "email": user_info.email,
          "avatar": avatar
        })
      }
    })
    .catch(() => {
      responseHandler.fail(res, 500, "처리 실패");
    })
  },

  viewProfileImage(req, res) {
    models.User.findOne({
      where: {
        id: req.session.userID
      }
    })
    .then(async function (user) {
      if (!user) {
        responseHandler.fail(res, 403, "잘못된 접근");
      } else {
        let image_uri = await datauri(user.dataValues.avatar);
        res.send(image_uri);
      }
    })
    .catch((err) => {
      responseHandler.fail(res, 500, "처리 실패");
    })
  },

  async changeAvatar(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      let user_info = await models.User.findOne({
        where: {
          id: req.session.userID
        }
      })

      let before_profile_path = user_info.dataValues.avatar;
      let after_profile_path = req.file.path;
      await models.User.update({
        profile: after_profile_path
      }, {
        where: { username: req.session.username }
      }, {
        transaction
      });

      if (before_profile_path) {
        fsp.unlink(before_profile_path);
      }

      transaction.commit();
      responseHandler.success(res, 200, "프로필 이미지 업로드 성공");
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  changePassword(req, res) {
    const before_password = req.body.before_password;
    const before_hash_password = crypto.createHash(hash).update(before_password + salt).digest("hex");

    const after_password = req.body.after_password;
    const after_password_verify = req.body.after_password_verify;
    const after_hash_password = crypto.createHash(hash).update(after_password + salt).digest("hex");

    if (after_password !== after_password_verify) {
      responseHandler.fail(res, 409, "비밀번호가 잘못되었습니다");
    } else {
      models.User.update({
        password: after_hash_password
      }, {
        where: { id: req.session.userID, password: before_hash_password }
      })
      .then(() => {
        responseHandler.success(res, 200, "비밀번호 변경 완료");
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      })
    }
  },
  
  verifyEmail(req, res) {
    models.User.update({ isVerify: true }, { 
      where: { 
        verifyKey: req.query.key 
      } 
    })
    .then((user) => {
      if (!user[0]) {
        responseHandler.fail(res, 409, "인증키 오류");
      } else {
        responseHandler.success(res, 200, "인증 성공 - 로그인 가능!");
      }
    })
    .catch((err) => {
      responseHandler.fail(res, 500, "처리 실패");
    })
  },
};
