const express = require('express');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/',(req,res)=>{
  const products = service.find();
  res.status(200).json(products);
})

router.get('/filter',(req,res) => {
  res.send('I´m filter')
})

router.get('/:id',(req,res)=>{
  const {id} = req.params;
  const product = service.findOne(id);
  res.status(200).json(product);
})

router.post('/',(req,res)=>{
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
})

router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  })
})

router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  res.json({
    message: 'deleted',
    id
  })
})

module.exports = router;
