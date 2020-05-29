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
const salt = process.env.SALT;

module.exports = {
  async register(req, res) {
    let userdir = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      let user_check = [];

      //TODO: optimize sequelize query
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
        responseHandler.fail(res, 409, "중복된 아이디 입니다");
      } else if (user_check[1]) {
        transaction.rollback();
        responseHandler.fail(res, 409, "중복된 이메일 입니다");
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
        fsp.mkdir(`${userdir}/${path.project}`);
        fsp.mkdir(`${userdir}/${path.dataset}`);
        fsp.mkdir(`${userdir}/${path.profile}`);

        const url = "http://" + `${server.ip}:${server.port}` +
          "/api/verifyEmail?key=" + `${verifyKey}`

        smtpHandler.mail(req.body.email, url);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "회원가입 성공 이메일 인증을 해주세요"
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
      console.log(err);
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  async unregister(req, res) {
    let transaction = null;
    const hashed_id = crypto
      .createHash("sha256")
      .update(req.body.username + salt)
      .digest("hex");
    const hashed_password = crypto
      .createHash("sha256")
      .update(req.body.password + salt)
      .digest("hex");

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({
        where: {
          username: req.session.username,
          password: hashed_password
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 403, "비밀번호 오류");
      } else {
        await models.User.destroy(
          {
            where: {
              id: req.session.userID,
              username: req.session.username,
              password: hashed_password,
            },
          },
          {
            transaction,
          }
        );

        rimraf.sync(`${path.storage}/${hashed_id}`);
        transaction.commit();
        responseHandler.success(res, 200, "회원탈퇴 성공");
      }
    } catch(err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  login(req, res) {
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
          responseHandler.fail(res, 401, "아이디 비밀번호 오류");
        } else if (user.dataValues.isVerify === false) {
          responseHandler.fail(res, 401, "이메일 인증필요");
        } else {
          req.session.userID = user.dataValues.id;
          req.session.username = user.dataValues.username;
          responseHandler.success(res, 200, "로그인 성공");
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
  },

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        responseHandler.fail(res, 403, "로그아웃 실패");
      } else {
        res.clearCookie("sid");
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
          email: req.body.email,
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 403, "이메일이 일치하지 않습니다");
      } else {
        smtpHandler.id(user.dataValues.email, user.dataValues.username);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "아이디 찾기 성공 - 이메일을 확인해주세요"
        );
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
          email: req.body.email,
        },
      });
      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 403, "아이디 또는 이메일이 일치하지 않습니다");
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
        smtpHandler.password(user.dataValues.email, user.dataValues.password);

        transaction.commit();
        responseHandler.success(
          res,
          200,
          "비밀 번호 찾기 성공 - 이메일을 확인해주세요"
        );
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
        id: req.session.userID,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 401, "잘못된 접근");
        } else {
          if (!user.dataValues.avatar) {
            avatar = "unexist";
          } else {
            avatar = "exist";
          }
          responseHandler.custom(res, 200, {
            username: user.username,
            email: user.email,
            avatar: avatar,
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
  },

  viewProfileImage(req, res) {
    models.User.findOne({
      where: {
        id: req.session.userID,
      },
    })
      .then(async function (user) {
        if (!user) {
          responseHandler.fail(res, 401, "잘못된 접근");
        } else {
          if (user.avatar == null) {
            responseHandler.fail(res, 403, "프로필 사진이 없습니다");
          } else {
            let image_uri = await datauri(user.dataValues.avatar);
            responseHandler.custom(res, 200, image_uri);
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
  },

  async changeAvatar(req, res) {
    let transaction = null;
    try {
      transaction = await models.sequelize.transaction();
      let user = await models.User.findOne({
        where: {
          id: req.session.userID,
        },
      });

      if(!user){
        responseHandler.fail(res, 401, "잘못된 접근");
      }else{
        let after_profile_path = req.file.path;
        await models.User.update(
          {
            avatar: after_profile_path,
          },
          {
            where: {
              username: req.session.username,
            },
          }, {
          transaction,
        });
      }
      let before_profile_path = user.dataValues.avatar;
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

  async deleteAvater(req, res) {
    let transaction = "";

    try {
      transaction = await models.sequelize.transaction();

      let user = await models.User.findOne({
        where: {
          id: req.session.userID,
        },
      });

      if (!user) {
        transaction.rollback();
        responseHandler.fail(res, 401, "잘못 된 접근");
      } else {
        await models.User.update({
          avatar: null
        }, {
          where: {
            username: req.session.username,
          },
        }, {
          transaction,
        });

        let profile_path = user.dataValues.avatar;
        if (profile_path) {
          fsp.unlink(profile_path);
        }

        await transaction.commit();
        responseHandler.success(res, 200, "프로필 삭제 성공");
      }
    } catch (err) {
      transaction.rollback();
      responseHandler.fail(res, 500, "처리 실패");
    }
  },

  checkPassword(req, res) {
    const password_verify = req.body.password_verify;

    models.User.findOne({
      where: {
        id: req.session.userID,
      },
    })
      .then((user) => {
        if (!user) {
          responseHandler.fail(res, 403, "잘못 된 접근입니다");
        } else {
          user_password = user.dataValues.password;
          if (user_password !== password_verify) {
            responseHandler.fail(res, 403, "비밀번호가 일치하지 않습니다");
          } else {
            responseHandler.success(res, 200, "본인 확인 완료");
          }
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
  },

  changePassword(req, res) {
    const before_password = req.body.before_password;
    const after_password = req.body.after_password;
    const before_hash_password = crypto
      .createHash(hash)
      .update(before_password + salt)
      .digest("hex");
    const after_hash_password = crypto
      .createHash(hash)
      .update(after_password + salt)
      .digest("hex");

    models.User.update(
      {
        password: after_hash_password,
      },
      {
        where: { id: req.session.userID, password: before_hash_password },
      }
    )
      .then((user) => {
        responseHandler.success(res, 200, "비밀번호 변경 완료");
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
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
          responseHandler.fail(res, 409, "인증키 오류");
        } else {
          responseHandler.success(res, 200, "인증 성공 - 로그인 가능!");
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "처리 실패");
      });
  },
};
