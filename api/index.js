const express = require('express');
const cors = require('cors');
const routerApi = require ('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler');

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500','http://172.30.133.147:5500'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)||!origin){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/api',(req,res)=>{
  res.send('Hello from express');
  })

app.get('/api/new-endpoint',(req,res)=>{
    res.send('Hello from the new endpoint')
    })

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log('Server listening on port ',port);
})
