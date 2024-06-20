const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().max(30);
const phone = Joi.number().min(8);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required()
})

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone
})

const getCustomerSchema = Joi.object({
  id: id.required()
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
