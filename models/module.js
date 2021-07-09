'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Module.init({
    title: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {
    sequelize,
    tableName: 'modules',
    modelName: 'Module',
  });
  return Module;
};