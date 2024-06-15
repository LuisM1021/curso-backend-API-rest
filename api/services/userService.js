
const getConnection = require('../../libs/postgres');

class UserService{
  constructor(){}

  async find(){
    const client = await getConnection();
    const res = await client.query('SELECT * FROM tasks');
    return res.rows;
  }

}

module.exports = UserService;
