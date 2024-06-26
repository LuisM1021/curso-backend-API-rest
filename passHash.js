const bycrypt = require('bcrypt');

async function hashPassword(){
  const myPassword = 'admin 123';
  const hash = await bycrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
