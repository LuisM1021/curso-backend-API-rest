const Joi = require('joi');
const { createUserSchema } = require('./userSchema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().max(30);
const phone = Joi.number().min(8);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
