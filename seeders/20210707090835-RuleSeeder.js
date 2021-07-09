'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkDelete("rules", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkInsert('rules', [
      {
        title: 'Foydalanuvchilar ko\'rish',
        module_id: 1,
        action_id: 1,
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
    await queryInterface.bulkDelete('rules', null, {});
  }
};
