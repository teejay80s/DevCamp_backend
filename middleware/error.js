const ErrorResponse = require('../utils/errorResponse')

const errorHandler =(err,req,res,next) => {
    let error = {...err}

    error.message = err.message;

    // log to console for dev
    console.log(err.message)

    // mongoose bad ObjectId

    if (err.name === 'CastError') {
        const message = `Bootcamp not found with id ${err.value}`
        error = new ErrorResponse(message,404)
    }

  // mongoose duplicate Key
  if (err.code === 11000) {
    const message = 'Duplicate field field value already exist '
    error = new ErrorResponse(message,400)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    
    error = new ErrorResponse(message,400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
    
}

module.exports = errorHandler