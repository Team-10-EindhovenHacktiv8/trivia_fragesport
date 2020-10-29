function errorHandler (err, req, res, next){
    let status = 500
    let message = 'internal server error'
    
    if(err.name === "SequelizeValidationError") {
      status = 400;
      message = [];
      err.errors.forEach(element => {
        message.push(element.message)
      });
      message = message.join(', ');
    }else if(err.name === "SequelizeUniqueConstraintError") {
      status = 400;
      message = [];
      err.errors.forEach(element => {
          message.push(element.message)
      });
      message = message.join(', ');
    }else if(err.name === "NotFound") {
      status = 404;
      message = 'Error, not found'
    }else if(err.name === 'UserUnauthorized') {
      status = 401;
      message = 'User unauthorized'
    }else if(err.name === 'WrongEmailPassword') {
      status = 401;
      message = 'Wrong email/password'
    }else if(err.name === 'JsonWebTokenError') {
      status = 401;
      message = 'User unauthorized'
    }
    res.status(status).json({
        message
    })
}

module.exports = errorHandler