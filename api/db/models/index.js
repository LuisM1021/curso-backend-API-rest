const { User, UserSchema } = require('./userModel');
const { Product, ProductSchema } = require('./productModel');
const { Customer, CustomerSchema } = require('./customerModel');
const { Category, CategorySchema } = require('./categoryModel');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));

  //Associations
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Product.associate(sequelize.models);
  Category.associate(sequelize.models);
}

module.exports = setupModels;
