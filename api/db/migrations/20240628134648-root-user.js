'use strict';
const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/userModel');
const { config } = require('../../config/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    const hash = await bcrypt.hash(config.rootPassword, 10);
    await queryInterface.bulkInsert(USER_TABLE, [{
      email: config.rootEmail,
      password: hash,
      role: 'admin',
      created_at: new Date()
    }])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(USER_TABLE, {
      email: config.rootEmail
    }, {});
  }
};
