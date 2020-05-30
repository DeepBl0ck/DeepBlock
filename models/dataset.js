'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dataset = sequelize.define('Dataset', {
    datasetName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    datasetPath: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {});
  Dataset.associate = function(models) {
    models.Dataset.hasMany(models.Class,{
      foreignKey: 'datasetID',
      onDelete: 'cascade',
    })
    models.Dataset.hasMany(models.Train,{
      foreignKey: 'datasetID',
      onDelete: 'cascade',
    })
    models.Dataset.hasMany(models.Test,{
      foreignKey: 'datasetID',
      onDelete: 'cascade',
    })
  };
  return Dataset;
};