'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkDelete("actions", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkInsert('actions', [
      {
        title: 'show',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        title: 'create',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        title: 'update',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        title: 'delete',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete('actions', null, {});

  }
};
