'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rule extends Model {
    static associate(models) {
      this.belongsTo(models.Action, {
        foreignKey: 'action_id',
        as: 'action'
       });
      this.belongsTo(models.Module, {
        foreignKey: 'module_id',
        as: 'module'
       });
    }
  };
  Rule.init({
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    module_id: {
      type: DataTypes.INTEGER
    },
    action_id: {
      type: DataTypes.INTEGER
    },
    indexes: [
      {
          unique: true,
          fields: ['module_id', 'action_id']
      }
  ]
  }, {
    sequelize,
    tableName: 'rules',
    modelName: 'Rule',
  });
  return Rule;
};