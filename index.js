const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
  res.send('Hello from express');
})

app.get('/new-endpoint',(req,res)=>{
  res.send('Hello from the new endpoint')
})

app.get('/products',(req,res)=>{
  res.json([
    {
      name: 'Product 1',
      price: 200
    },
    {
      name: 'Product 2',
      price: 1200
    }
  ])
})

app.get('/products/:id',(req,res)=>{
  const {id} = req.params;
  res.json(
    {
      productId: id,
      name: 'Product 1',
      price: 200
    }
  )
})

app.get('/categories/:categoryId/products/:productId',(req,res)=>{
  const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  })
})

app.listen(port,()=>{
  console.log('Server listening on port ',port);
})
