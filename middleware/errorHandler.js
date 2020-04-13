const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  console.log(err);

  // Mongo bad ObjectId
  if(err.name === 'CastError') {
    const message = 'Resource not found';
    error.message = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message
  });
};

module.exports = errorHandler;