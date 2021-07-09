'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: **/
    await queryInterface.bulkDelete("modules", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkInsert('modules', [
      {
        title: 'users',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        title: 'products',
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
    await queryInterface.bulkDelete('modules', null, {});

  }
};
