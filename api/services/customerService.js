const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');


class CustomerService{
  constructor(){}

  async find(){
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data){
    data.user.password = await bcrypt.hash(data.user.password, 10);
    const newCustomer = await models.Customer.create(data,{
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes){
    const customer = await this.findOne(id);
    const res = await customer.update(changes);
    return res;
  }

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
