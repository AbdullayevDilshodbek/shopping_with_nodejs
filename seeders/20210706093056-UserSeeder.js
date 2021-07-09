'use strict';
const bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example: */
    await queryInterface.bulkDelete("users", null, {
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkInsert('users', [
      {
        username: 'don',
        password: await bcrypt.hash('123', await bcrypt.genSalt()),
        full_name: 'Dilshodbek',
        active: true,
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        username: 'client',
        password: await bcrypt.hash('123', await bcrypt.genSalt()),
        full_name: 'Client',
        active: true,
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
      {
        username: 'admin',
        password: await bcrypt.hash('123', await bcrypt.genSalt()),
        full_name: 'Admin',
        active: true,
        createdAt: '2021-07-07 14:14:49',
        updatedAt: '2021-07-07 14:14:49'
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
    await queryInterface.bulkDelete('users', null, {});

  }
};
