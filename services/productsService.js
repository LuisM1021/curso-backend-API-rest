const { faker } = require('@faker-js/faker');

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
          image: faker.image.url()
      })
    }
  }
  create(data){
    const newItem = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newItem);
    return newItem;
  }
  find(){
    return this.products;
  }
  findOne(id){
    return this.products.find(item => item.id === id);
  }
  update(id,updatedItem){
    const itemIndex = this.products.findIndex(product => product.id === id);
    if (itemIndex !== -1){
      const product = this.products[itemIndex];
      this.products[itemIndex] = {
        ...product,
        ...updatedItem
      };
      return this.products[itemIndex];
    } else{
      throw new Error('Product not found');
    }
  }
  delete(id){
    const itemIndex = this.products.findIndex(product => product.id === id);
    if (itemIndex !== -1){
      this.products.splice(itemIndex,1);
      return { id };
    }else{
      throw new Error('Product not found');
    }
  }
}

module.exports = ProductsService;
