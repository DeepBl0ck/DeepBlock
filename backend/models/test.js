'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test
    = sequelize.define('Test', {
      accuracy: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      correct: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      incorrect: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    }, {});
  Test.associate = function (models) {
    models.Test.hasMany(models.Prediction, {
      foreignKey: 'testID',
      onDelete: 'cascade',
    })
  };
  return Test;
};