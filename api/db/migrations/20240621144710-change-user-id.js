'use strict';

const { CUSTOMER_TABLE } = require('../models/customerModel');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    queryInterface.changeColumn(CUSTOMER_TABLE,'user_id',{
      field: 'user_id',
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    })
  },

  async down (queryInterface) {
  }
};
