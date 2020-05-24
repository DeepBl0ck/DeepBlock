'use strict';
module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
    resultPath: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Train.associate = function(models) {
    // associations can be defined here
  };
  return Train;
};