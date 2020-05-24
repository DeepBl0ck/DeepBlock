'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isVerify: {
      required: true,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    verifyKey: {
      required: true,
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Project,{
      foreignKey: 'userID',
      onDelete: 'cascade',
    })

    models.User.hasMany(models.Dataset,{
      foreignKey: 'userID',
      onDelete: 'cascade',
    })
  };
  return User;
};