'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      module_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'modules',
        //   key: 'id'
        // }
      },
      action_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'actions',
        //   key: 'id'
        // }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rules');
  }
};