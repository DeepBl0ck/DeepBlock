'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define('Thumbnail', {
    thumbnailPath: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Thumbnail.associate = function(models) {
    // associations can be defined here
  };
  return Thumbnail;
};