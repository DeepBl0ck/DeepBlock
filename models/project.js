'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    projectPath: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    projectImage: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  Project.associate = function (models) {
    models.Project.hasMany(models.Train, {
      foreignKey: 'projectID',
      onDelete: 'cascade',
    })
    models.Project.hasMany(models.Test, {
      foreignKey: 'projectID',
      onDelete: 'cascade',
    })
  };
  return Project;
};