const jwtService = require('../services/jwt.service.js');
const AppError = require('../utils/appError.js');

const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';
  const [, token] = authorization.split(' ');

  if (!authorization || !token) {
    throw new AppError('UnauthorizedError', 'Unauthorized access', 401);
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    throw new AppError('UnauthorizedError', 'Unauthorized access', 401);
  }

  next();
};

module.exports = {
  authMiddleware,
};
