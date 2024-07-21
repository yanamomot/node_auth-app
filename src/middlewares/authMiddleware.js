const jwtService = require('../services/jwt.service.js');
const ApiError = require('../utils/apiError.js');
const TypeErrorMessages = require('../utils/errMessages.js');

const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';
  const [, token] = authorization.split(' ');

  if (!authorization || !token) {
    throw ApiError.unauthorized({ email: TypeErrorMessages.ReqAuthorize });
  }

  const userData = jwtService.verify(token);

  if (!userData) {
    throw ApiError.unauthorized({ email: TypeErrorMessages.ReqAuthorize });
  }

  next();
};

module.exports = {
  authMiddleware,
};
