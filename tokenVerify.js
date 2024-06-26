const jwt = require('jsonwebtoken');

const secret = 'myfKey'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxOTQxOTgwMH0.USvkEzzhepXrXfI7-2gB2YszuG4nXryREfOx1HU8G0o'

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
