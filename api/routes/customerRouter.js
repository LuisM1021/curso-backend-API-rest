const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('../schemas/customerSchema');
const CustomerService = require('../services/customerService');

const router = express.Router();
const service = new CustomerService();

router.get('/', async(req, res, next)=>{
  try {
    const customers = await service.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
})

router.get('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async(req, res, next)=>{
  try {
    const { id } = req.params;
    const customers = await service.findOne(id);
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async(req, res, next)=>{
  try {
    const body = req.body;
    const customers = await service.create(body);
    res.status(201).json(customers);
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async(req, res, next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const customers = await service.update(id,body);
    res.json(customers);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validationHandler(getCustomerSchema, 'params'),
  async(req, res, next)=>{
  try {
    const { id } = req.params;
    const customers = await service.delete(id);
    res.json(customers);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
