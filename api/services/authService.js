const UserService = require('./userService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const service = new UserService();
const nodemailer = require('nodemailer');

class AuthService{

  async getUser(email, password){
    const user = await service.findByEmail(email);
      if(!user){
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, user.dataValues.password);
      if(!isMatch){
        throw boom.unauthorized();
      }
      delete user.dataValues.password;
      return user;
  }
  signToken(user){
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret);
      return({
        user,
        token
      });
  }
  async sendMail(email){
    const user = await service.findByEmail(email);
      if(!user){
        throw boom.unauthorized();
      }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      }
    });
    await transporter.sendMail({
      from: config.mailUser, // sender address
      to: user.email, // list of receivers
      subject: "Correo desde node", // Subject line
      text: "Hola desde node con env", // plain text body
      html: "<b>Hola desde node con env<b>", // html body
    });
    return { message: 'mail sent' }
  }
}

module.exports = AuthService
