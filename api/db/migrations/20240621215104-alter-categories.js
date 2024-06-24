'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('../models/categoryModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(CATEGORY_TABLE,'created_at',{
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORY_TABLE,'created_at');
  }
};
