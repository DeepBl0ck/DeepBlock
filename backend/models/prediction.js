'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prediction
    = sequelize.define('Prediction', {
      type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      predict1: {
        allowNull: false,
        type: DataTypes.STRING
      },
      predict2: {
        allowNull: false,
        type: DataTypes.STRING
      },
      percent1: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      percent2: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      answer: {
        allowNull: false,
        type: DataTypes.STRING
      },
      imagePath: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }, {});
  Prediction.associate = function (models) {

  };
  return Prediction;
};