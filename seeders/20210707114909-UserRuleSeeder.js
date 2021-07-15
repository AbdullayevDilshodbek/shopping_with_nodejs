'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_rules", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkInsert('user_rules', [
      {
      user_id: 1,
      rule_id: 1 // user larni ko'rish
      },
      {
      user_id: 1,
      rule_id: 2 //rule ko'rish
      },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_rules', null, {});
  }
};
