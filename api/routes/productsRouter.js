const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productSchema');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/',async (req,res)=>{
  const products =await service.find();
  res.status(200).json(products);
})

router.get('/filter',(req,res) => {
  res.send('I´m filter')
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
  validationHandler(createProductSchema, 'body'),
  async (req,res)=>{
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
)

router.patch('/:id',
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

router.delete('/:id', async (req,res)=>{
  const {id} = req.params;
  const deletedProduct = await service.delete(id);
  res.json(deletedProduct);
})
module.exports = router;
