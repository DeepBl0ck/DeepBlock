"use strict";

const fsp = require("fs").promises;
const sharp = require("sharp");
const datauri = require("datauri");
const models = require("../models");
const responseHandler = require("@utils/responseHandler");

module.exports = {
  sendClassImage(req, res) {
    models.Image.findAll({
      limit: parseInt(req.query.limit),
      offset: (parseInt(req.query.offset) - 1) * parseInt(req.query.limit),
      where: {
        classID: req.params.class_id,
      },
      order: [["id", "asc"]],
    })
      .then(async (images) => {
        let image_list = [];

        for (let image of images) {
          let image_uri = await datauri(image.dataValues.thumbnailPath);
          image_list.push({
            id: image.dataValues.id,
            src: image_uri,
          });
        }
        responseHandler.custom(res, 200, {
          image_list: image_list,
        });
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },

  async uploadImage(req, res) {
    let class_id = req.params.class_id;
    let sharp_list = [];
    let create_list = [];

    for (var file of req.files) {
      create_list.push({
        classID: parseInt(class_id),
        originalPath: file.path,
        thumbnailPath: `${req.thumbnail_path}/${file.filename}`,
      });

      sharp_list.push(
        sharp(file.path)
          .resize({ height: 28, width: 28 })
          .toFile(`${req.thumbnail_path}/${file.filename}`)
      );
    }

    Promise.all(sharp_list);
    models.Class.findOne({ where: { id: class_id } }).then((class_info) => {
      const image_count = parseInt(class_info.dataValues.imageCount) + parseInt(req.files.length);
      models.Class.update({ imageCount: image_count }, { where: { id: class_id } });
      models.Image.bulkCreate(create_list)
        .then(() => {
          responseHandler.custom(res, 200, { count: parseInt(image_count) });
        })
        .catch(() => {
          responseHandler.fail(res, 500, "Processing fail");
        });
    })
  },

  async deleteImage(req, res) {
    try {
      let target = await models.Class.findOne({
        include: [
          {
            model: models.Image,
            where: {
              id: req.params.image_id,
            },
          },
        ],
        where: {
          datasetID: req.params.dataset_id,
          id: req.params.class_id
        },
      });

      if (target) {
        let target_image = target.dataValues.Images[0].dataValues;
        await models.Image.destroy({
          where: { classID: req.params.class_id, id: target_image.id },
        });

        await fsp.unlink(target_image.thumbnailPath);
        await fsp.unlink(target_image.originalPath);
        const image_count = target.dataValues.imageCount - 1;
        models.Class.update({ imageCount: image_count }, { where: { id: req.params.class_id } });
        responseHandler.custom(res, 200, { count: parseInt(image_count) });
      } else {
        responseHandler.fail(res, 401, "Wrong approach");
      }
    } catch (err) {
      responseHandler.fail(res, 500, "Processing fail");
    }
  },

  sendOrigianlImage(req, res) {
    models.Class.findOne({
      include: [
        {
          model: models.Image,
          where: {
            id: req.params.image_id,
          },
        },
      ],
      where: {
        datasetID: req.params.dataset_id,
        id: req.params.class_id,
      },
    })
      .then((result) => {
        if (!result) {
          responseHandler.fail(res, 401, "Wrong approach");
        } else {
          let image = result.dataValues.Images[0];
          datauri(image.dataValues.thumbnailPath, (err, image_uri) => {
            responseHandler.custom(res, 200, {
              image_uri: image_uri,
            });
          });
        }
      })
      .catch((err) => {
        responseHandler.fail(res, 500, "Processing fail");
      });
  },
};
