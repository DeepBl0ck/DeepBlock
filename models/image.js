'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    originalPath: {
      allowNull: false,
      type: DataTypes.STRING
    },
    thumbnailPath: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Image.associate = function (models) {
    // associations can be defined here
  };
  return Image;
};