
const getConnection = require('../../libs/postgres');

class UserService{
  constructor(){}

  async find(){
    const client = await getConnection();
    const res = await client.query('SELECT * FROM tasks');
    return res.rows;
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
