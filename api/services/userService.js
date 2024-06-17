
const { models } = require('../libs/sequelize');

class UserService{
  constructor(){}

  async find(){
    const res = await models.User.findAll();
    return res;
  }
  async create(data){
    return {
      status: 'ok',
      result: 'created',
      newUser: data
    }
  }
}

module.exports = UserService;
