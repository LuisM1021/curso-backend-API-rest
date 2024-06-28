'use strict';

const {  USER_TABLE, UserSchema } = require('../models/userModel')
const { PRODUCTS_TABLE, ProductSchema } = require('../models/productModel');
const { CUSTOMER_TABLE, CustomerSchema } = require('../models/customerModel');
const { CATEGORY_TABLE, CategorySchema } = require('../models/categoryModel');
const { ORDER_TABLE, OrderSchema } = require('../models/orderModel');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/orderProductModel');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema );
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema );
    await queryInterface.createTable(PRODUCTS_TABLE, ProductSchema );
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema );
    await queryInterface.createTable(ORDER_TABLE, OrderSchema );
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema );
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCTS_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
