'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
  
    static associate(models) {
      // 
    }
  };
  Action.init({
    title: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'actions',
    modelName: 'Action',
  });
  return Action;
};