const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService{
  constructor(){}

  async create(data){
    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create(data);
    delete newUser.dataValues.password;
    return newUser;
  }

  async find(){
    const res = await models.User.findAll({
      include: ['customer']
    });
    return res;
  }

  async findByEmail(email){
    const res = await models.User.findOne({
      where: { email }
    });
    return res;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
