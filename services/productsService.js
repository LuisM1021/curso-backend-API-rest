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
  create(newItem){
    this.products.push(newItem);
    const response = {
      message: 'created',
      data: newItem
    }
    return response;
  }
  find(){
    return this.products;
  }
  findOne(id){
    return this.products.find(item => item.id === id);
  }
  update(id,updatedItem){
    let updated = false;
    let changedItem
    this.products.forEach((product,index) =>{
      if(product.id === id){
        this.products[index] = updatedItem;
        updated = true;
        changedItem = this.products[index];
      }
    });
    if(updated){
      return {
        message: 'updated',
        data: changedItem,
        id
      }
    }else{
      return {
        message: 'Not found',
        data: null,
        id
      }
    }
  }
  delete(id){
    let deleted = false;
    this.products = this.products.filter(product=>{
      if(product.id !== id){
        return product;
      }else{
        deleted = true
      }
    })
    if(deleted){
      return {
        message: 'deleted',
        id
      }
    }else{
      return{
        message: 'not found',
        id
      }
    }
  }
}

module.exports = ProductsService;
