const authMiddleware = (req, res, next) => {
  const authorization = req.headers['authorization'] || '';
  const [, token] = authorization.split(' ');

  if (!authorization || !token) {
    res.status(401).send();
  }
};

module.exports = {
  authMiddleware,
};
