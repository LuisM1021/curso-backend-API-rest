const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const { getOrderSchema, createOrderSchema, updateOrderSchema, createOrderProductSchema } = require('../schemas/orderSchema');
const OrderService = require('../services/orderService');

const router = express.Router();
const service = new OrderService();

router.get('/',
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/add-item',
  validationHandler(createOrderProductSchema, 'body'),
  async (req, res, next) =>{
    try {
      const body = req.body;
      const addedItem = await service.addItem(body);
      res.status(201).json(addedItem);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedOrder = await service.update(id, body);
      res.status(201).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
