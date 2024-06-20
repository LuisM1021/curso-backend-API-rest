const { Model, DataTypes, Sequelize } = require('sequelize');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id:{
    allowNull: false,
    autoincrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName:{
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING
  },
  phone:{
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt:{
    allowNull: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Customer extends Model{

  // static associate(models){
  //   this.belongsTo(models)
  // }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE}
