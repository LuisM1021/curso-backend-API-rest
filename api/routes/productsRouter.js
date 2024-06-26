const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/productSchema');

const passport = require('passport');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/',
  validationHandler(queryProductSchema,'query'),
  async (req,res,next)=>{
  try {
    const products = await service.find(req.query);
    res.status(200).json(products);
  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validationHandler(getProductSchema, 'params'),
  async (req,res, next)=>{
  try {
    const {id} = req.params;
    const product = await  service.findOne(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validationHandler(createProductSchema, 'body'),
  async (req, res, next)=>{
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const updatedProduct = await service.update(id,body);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  validationHandler(getProductSchema, 'params'),
  async (req, res, next)=>{
  try {
    const {id} = req.params;
    const deletedProduct = await service.delete(id);
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
})
module.exports = router;
