const bycrypt = require('bcrypt');

async function verifyPassword(){
  const myPassword = 'admin 123';
  const hash = '$2b$10$JIJeyV7.SQWg0rQ6wf0rBuh1Xk9xwQpkVX4J5c5QkidAyJqiEGot6';
  const isMatch = await bycrypt.compare(myPassword, hash)
  console.log(isMatch);
}

verifyPassword();
