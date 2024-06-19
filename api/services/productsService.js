const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }
  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
        this.products.push({
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(),10),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean()
      })
    }
  }
  async find(){
    return {s: 'something'}
  }
  async create(data){
    const newItem = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newItem);
    return newItem;
  }
  async findOne(id){
    const product =  this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is block');
    }
    return product;
  }
  async update(id,updatedItem){
    const itemIndex = this.products.findIndex(product => product.id === id);
    if (itemIndex !== -1){
      const product = this.products[itemIndex];
      this.products[itemIndex] = {
        ...product,
        ...updatedItem
      };
      return this.products[itemIndex];
    } else{
      throw boom.notFound('Product not found');
    }
  }
  async delete(id){
    const itemIndex = this.products.findIndex(product => product.id === id);
    if (itemIndex !== -1){
      this.products.splice(itemIndex,1);
      return { id };
    }else{
      throw boom.notFound('Product not found');
    }
  }
}

module.exports = ProductsService;
