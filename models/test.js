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
      testPath: {
        allowNull: false,
        type: DataTypes.STRING
      },
    }, {});
  Test.associate = function (models) {
    // associations can be defined here
  };
  return Test;
};