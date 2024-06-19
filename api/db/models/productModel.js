const { Model, DataTypes, Sequelize } = require('sequelize');

const PRODUCTS_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Product extends Model {
  static associate(){
    //models
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { ProductSchema, Product, PRODUCTS_TABLE }
