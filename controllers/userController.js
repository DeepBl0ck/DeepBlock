'use strict'

const crypto = require("crypto");
const fs = require('fs');
const fsp = require('fs').promises;
const rimraf = require('rimraf');
const nodemailer = require('nodemailer');
const smtpTransporter = require('nodemailer-smtp-transport');
const datauri = require('datauri');
const models = require("../models");
const responseHandler = require('@utils/responseHandler');
const { admin_email } = require("@config/email");
const path = require("@config/path");
const server = require("@config/server");
const salt = process.env.SALT;

module.exports = {
  async register(req, res) {
    let userdir = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      let user_check = [];

      //TODO: optimize sequelize query
      user_check.push(await models.User.findOne({
        where: {
          username: req.body.username
        }
      }));
      user_check.push(await models.User.findOne({
        where: {
          email: req.body.email
        }
      }));

      if (user_check[0]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 아이디 입니다");
      } else if (user_check[1]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 이메일 입니다");
      } else {
        const hashed_id = crypto.createHash("sha256").update(req.body.username + salt).digest("hex");
        const hashed_password = crypto.createHash("sha256").update(req.body.password + salt).digest("hex");
        const verifyKey = crypto.randomBytes(16).toString('hex');

        userdir = `${path.storage}/${hashed_id}`;

        await models.User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashed_password,
          avatar: null,
          verifyKey: verifyKey
        }, {
          transaction
        });

        fs.mkdirSync(userdir);
        fsp.mkdir(`${userdir}/${path.project}`);
        fsp.mkdir(`${userdir}/${path.dataset}`);
        fsp.mkdir(`${userdir}/${path.profile}`);

        const url = "<a href='http://" + `${server.ip}:${server.port}` + "/api/verifyEmail?key=" + `${verifyKey}` + "'>verify</a>"
        const mailOptions = {
          from: admin_email.id,
          to: req.body.email,
          subject: "deepblock - 이메일 인증을 해주세요",
          html: "<h1>이메일 인증을 위해 URL을 클릭해주세요</h1>" + url
        };
        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email.service,
          auth: {
            user: admin_email.id,
            pass: admin_email.pw
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
      if (userdir) {
        fs.access(userdir, fs.constants.F_OK, ((e) => {
          if (!e) {
            rimraf.sync(userdir);
          }
        }));
      }

      //FIX: null type check
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async unregister(req, res) {
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      //FIXME: ? password 다시 질의하는 이유?
      let user = await models.User.findOne({
        where: {
          username: req.session.username,
          password: hashed_password
        }
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 409, "비밀번호 오류");
      } else {
        const hashed_id = crypto.createHash("sha256").update(req.body.username + salt).digest("hex");
        const hashed_password = crypto.createHash("sha256").update(req.body.password + salt).digest("hex");

        await models.User.destroy({
          where: {
            id: req.session.userID,
            username: req.session.username,
            password: hashed_password
          }
        }, {
          transaction
        });

        rimraf.sync(`${path.storage}/${hashed_id}`);
        transaction.commit();
        responseHandler.success(res, 200, "회원탈퇴 성공");
      }
    } catch {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  login(req, res) {
    models.User.findOne({
      where: {
        username: req.body.username,
        password: crypto.createHash("sha256").update(req.body.password + salt).digest("hex")
      }
    }).then(user => {
      if (!user) {
        responseHandler.fail(res, 409, "아이디 비밀번호 오류");
      } else if (user.dataValues.isVerify === false) {
        responseHandler.fail(res, 403, "이메일 인증필요");
      } else {
        req.session.userID = user.dataValues.id;
        req.session.username = user.dataValues.username;
        responseHandler.success(res, 200, "로그인 성공");
      }
    }).catch((err) => {
      console.log(err)
      responseHandler.fail(res, 500, "처리 실패");
    });
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
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

      let user = await models.User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 409, "등록되지 않은 사용자 입니다");
      } else {
        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email.service,
          auth: {
            user: admin_email.id,
            pass: admin_email.pw
          }
        }));
        const mailOptions = {
          from: admin_email.id,
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
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async findPassword(req, res) {
    let transaction = null;
    try {
      transaction = await models.sequelize.transaction();
      let user = await models.User.findOne({
        where: {
          username: req.body.username,
          email: req.body.email
        }
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 401, "등록되지 않은 사용자 입니다");
      } else {
        const temp_pw = crypto.randomBytes(8).toString('hex');

        await models.User.update({
          password: crypto.createHash("sha256").update(temp_pw + salt).digest("hex")
        }, {
          where: {
            username: user.dataValues.username,
            email: user.dataValues.email
          }
        }, {
          transaction
        });

        const smtpTransport = nodemailer.createTransport(smtpTransporter({
          service: admin_email.service,
          auth: {
            user: admin_email.id,
            pass: admin_email.pw
          }
        }));
        const mailOptions = {
          from: admin_email.id,
          to: req.body.email,
          subject: "deepblock - 임시 비밀번호",
          text: `${temp_pw}`
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
      if (transaction) {
        transaction.rollback();
      }
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
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "등록되지 않은 사용자입니다");
        } else {
          if (!user.avatar) {
            avatar = "unexist";
          } else {
            avatar = "exist";
          }

          //TODO: avatar 구현
          responseHandler.custom(res, 200, {
            "username": user.username,
            "email": user.email,
            "avatar": avatar
          })
        }
      })
      .catch((err) => {
        console.log(err)
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
      let user = await models.User.findOne({
        where: {
          id: req.session.userID
        }
      })
      
      let before_profile_path = user.dataValues.avatar;
      let after_profile_path = req.file.path;
      await models.User.update({
        avatar: after_profile_path
      }, {
        where: {
          username: req.session.username
        }
      }, {
        transaction
      });

      if (before_profile_path) {
        fsp.unlink(before_profile_path);
      }

      transaction.commit();
      responseHandler.success(res, 200, "프로필 이미지 업로드 성공");
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  changePassword(req, res) {
    if (req.body.after_password !== req.body.after_password_verify) {
      responseHandler.fail(res, 409, "비밀번호 재확인이 일치하지 않습니다.");
    }
    models.User.update({
      password: crypto.createHash("sha256").update(req.body.after_password + salt).digest("hex")
    }, {
      where: {
        id: req.session.userID,
        password: crypto.createHash("sha256").update(req.body.before_password + salt).digest("hex")
      }
    })
    .then(() => {
      responseHandler.success(res, 200, "비밀번호 변경 완료");
    })
    .catch((err) => {
      console.log(err)
      responseHandler.fail(res, 500, "처리 실패");
    })

  },

  verifyEmail(req, res) {
    models.User.update({
      isVerify: true
    }, {
      where: {
        verifyKey: req.query.key
      }
    })
      .then((user) => {
        //TODO: !user가 아니라 !user[0] 인 이유?
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