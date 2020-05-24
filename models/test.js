'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test
   = sequelize.define('Test', {
    loss: {
      allowNull: false,
      type: DataTypes.DOUBLE
    },
    accuracy: {
      allowNull: false,
      type: DataTypes.DOUBLE
    }
  }, {});
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};