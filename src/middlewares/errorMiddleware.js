const ApiError = require('../utils/apiError');

const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
    });
  }

  res.status(500).send({ message: 'Server error' });

  next();
};

module.exports = errorMiddleware;
