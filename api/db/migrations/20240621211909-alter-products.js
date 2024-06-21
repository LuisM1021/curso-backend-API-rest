'use strict';
const DataTypes = require('sequelize');
const { PRODUCTS_TABLE } = require('../models/productModel');
const { CATEGORY_TABLE } = require('../models/categoryModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface ) {
    await queryInterface.addColumn(PRODUCTS_TABLE, 'description',{
      allowNull: false,
      type: DataTypes.TEXT
    })

    await queryInterface.addColumn(PRODUCTS_TABLE, 'category_id',{
      allowNull: false,
      field: 'category_id',
      type: DataTypes.INTEGER,
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('description');
    await queryInterface.removeColumn('category_id');
  }
};
