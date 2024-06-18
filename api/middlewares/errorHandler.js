const { ValidationError } = require('sequelize');

function logErrors(error, req, res, next){
  console.log('logErrors')
  console.error(error);
  next(error);
}

function errorHandler(error, req, res, next){
  console.log('errorHandler')
  res.status(500).json({
    message: error.message,
    stack: error.stack
  })
}

function boomErrorHandler(err, req, res, next){
  console.log('boomerrHandler');
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);
  }
}

function ormErrorHandler(error, req, res, next){
  if(error instanceof ValidationError){
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors
    })
  }
  next(error);
}


module.exports = {logErrors, errorHandler, boomErrorHandler, ormErrorHandler}
