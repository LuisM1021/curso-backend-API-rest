const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')

class OrderService{
  constructor(){}

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id,{
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order){
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async findByUser(userId){
    const userOrders = await models.Order.findAll({
      where: {
        '$customer.user.id$' : userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    return userOrders;
  }

  async create(userId){
    const customer = await models.Customer.findAll({
      where: {
        userId: userId
      }
    });
    const customerId = customer[0].dataValues.id;
    const newOrder = await models.Order.create({
      'customerId': customerId
    });
    return newOrder;
  }

  async addItem(data){
    const addedItem = await models.OrderProduct.create(data);
    return addedItem;
  }

  async update(id, changes){
    const order = await this.findOne(id);
    const updatedOrder = await order.update(changes);
    return updatedOrder;
  }

  async delete(id){
    const order = await this.findOne(id);
    await order.destroy(id);
    return { id };
  }
}

module.exports = OrderService;
