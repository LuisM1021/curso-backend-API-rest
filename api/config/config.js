require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbURI: process.env.DB_URI,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  mailUser: process.env.GMAIL_USER,
  mailPassword: process.env.GMAIL_PWD,
  rootEmail: process.env.ROOT_EMAIL,
  rootPassword: process.env.ROOT_PWD
}

module.exports = { config };
