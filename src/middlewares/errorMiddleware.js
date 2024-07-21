const errorMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });

  next();
};

module.exports = errorMiddleware;
