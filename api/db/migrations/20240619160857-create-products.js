'use strict';

const { PRODUCTS_TABLE, ProductSchema } = require('../models/productModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCTS_TABLE);
  }
};
