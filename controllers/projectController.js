"use strict";

const crypto = require("crypto");
const fs = require("fs");
const fsp = require("fs").promises;
const rimraf = require("rimraf");
const datauri = require("datauri");
const models = require("../models");
const path = require("@config/path");
const responseHandler = require("@utils/responseHandler");
const salt = process.env.SALT;

module.exports = {
  viewProjectList(req, res) {
    models.Project.findAll({
      where: {
        userID: req.session_id,
      },
    })
      .then(async function (project_list) {
        if (!project_list.length) {
          responseHandler.custom(res, 200, {
            result: "success",
            project_info: {},
          });
        } else {
          let proj_arr = [];
          for (var _project of project_list) {
            let project_basic_image = null;
            _project = _project.dataValues;

            if (_project.projectImage === null) {
              project_basic_image = await datauri("./public/White.png");
            }

            proj_arr.push({
              id: _project.id,
              src: project_basic_image,
              name: _project.projectName,
              description: _project.description,
            });
          }

          responseHandler.custom(res, 200, {
            result: "success",
            project_info: proj_arr,
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async createProject(req, res) {
    let user_project_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();

      const user_project = await models.Project.findOne({
        where: {
          userID: req.session_id,
          projectName: req.body.project_name,
        },
      });

      if (user_project) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicate project name");
      } else {
        const hashed_id = crypto
          .createHash("sha256")
          .update(req.session_name + salt)
          .digest("hex");
        user_project_path = `${path.storage}/${hashed_id}/${path.project}/${req.body.project_name}`;

        let result = await models.Project.create(
          {
            userID: req.session_id,
            projectName: req.body.project_name,
            projectPath: user_project_path,
            projectImage: null,
            description: req.body.description,
          },
          {
            transaction,
          }
        );

        fs.mkdirSync(user_project_path);
        fs.mkdirSync(`${user_project_path}/result`);

        const history_file = `${user_project_path}/result/train_history.json`;
        const history_json = {
          success: true,
          state: "no_result",
          epochs: 0,
          batch_size: 0,
          val_per: 0,
          history: [],
        };
        fs.writeFileSync(history_file, JSON.stringify(history_json));

        await transaction.commit();
        let project_id = result.dataValues.id;
        responseHandler.custom(res, 200, {
          result: "success",
          project_id: project_id,
        });
      }
    } catch (err) {
      if (user_project_path) {
        fs.access(user_project_path, fs.constants.F_OK, (e) => {
          if (!e) {
            rimraf.sync(user_project_path);
          }
        });
      }
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async deleteProject(req, res) {
    let user_project_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      const user_project = await models.Project.findOne({
        where: {
          userID: req.session_id,
          id: req.params.project_id,
        },
      });

      if (!user_project) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Wrong approach");
      } else {
        user_project_path = user_project.dataValues.projectPath;

        await models.Project.destroy(
          {
            where: {
              userID: req.session_id,
              id: req.params.project_id,
              projectPath: user_project_path,
            },
          },
          {
            transaction,
          }
        );

        rimraf.sync(user_project_path);
        await transaction.commit();
        responseHandler.success(res, 200, "Delete success");
      }
    } catch (err) {
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  async updateProjectName(req, res) {
    let before_project_path = null;
    let after_project_path = null;
    let transaction = null;

    try {
      transaction = await models.sequelize.transaction();
      const before_project = await models.Project.findOne({
        where: {
          userID: req.session_id,
          id: req.params.project_id,
        },
      });

      if (!before_project) {
        transaction.rollback();
        responseHandler.fail(res, 401, "Wrong approach");
      } else if (
        await models.Project.findOne({
          where: { userID: req.session_id, projectName: req.body.after },
        })
      ) {
        transaction.rollback();
        responseHandler.fail(res, 409, "Duplicate project name");
      } else {
        const hashed_id = crypto
          .createHash("sha256")
          .update(req.session_name + salt)
          .digest("hex");
        const after_project_name = req.body.after;

        before_project_path = before_project.dataValues.projectPath;
        after_project_path = `${path.storage}/${hashed_id}/${path.project}/${after_project_name}`;

        await models.Project.update(
          {
            projectName: after_project_name,
            projectPath: after_project_path,
          },
          {
            where: {
              userID: req.session_id,
              id: req.params.project_id,
            },
          },
          {
            transaction,
          }
        );

        fsp.rename(before_project_path, after_project_path);
        await transaction.commit();
        responseHandler.success(res, 200, "Change project name success");
      }
    } catch (err) {
      if (after_project_path) {
        fs.access(after_project_path, fs.constants.F_OK, (e) => {
          if (!e) {
            fsp.rename(after_project_path, before_project_path);
          }
        });
      }
      if (transaction) {
        transaction.rollback();
      }
      responseHandler.fail(res, 500, "Processing fail");
    }
  },
};
