const express = require('express');
const routerApi = require ('./routes');

const app = express();
const port = 3000;

routerApi(app);

app.get('/',(req,res)=>{
  res.send('Hello from express');
})

app.get('/new-endpoint',(req,res)=>{
  res.send('Hello from the new endpoint')
})

app.listen(port,()=>{
  console.log('Server listening on port ',port);
})
