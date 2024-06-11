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


module.exports = {logErrors, errorHandler, boomErrorHandler}
