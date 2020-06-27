'use strict';
module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
    resultPath: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    optimizer: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lossFunction: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  }, {});
  Train.associate = function (models) {
    // associations can be defined here
  };
  return Train;
};