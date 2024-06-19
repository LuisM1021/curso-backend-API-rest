const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  User.init(ProductSchema, Product.config(sequelize));
}

module.exports = setupModels;
