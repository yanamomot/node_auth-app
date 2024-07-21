const { sendActivationEmail } = require('../services/email.service.js');
const authService = require('../services/auth.service.js');
const jwtService = require('../services/jwt.service.js');
const normalize = require('../helper/normalize.js');
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/appError.js');

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new AppError('ValidationError', 'Email is required', 400);
  }

  if (!password) {
    throw new AppError('ValidationError', 'Password is required', 400);
  }

  const activationToken = `${uuidv4()}${uuidv4()}${uuidv4()}${uuidv4()}`;
  const newUser = await authService.create(email, password, activationToken);

  await sendActivationEmail(email, activationToken);

  return res.status(200).send(normalize(newUser));
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const client = await authService.getOneBy('token', activationToken);

  if (!client) {
    throw new AppError('NotFoundError', 'Activation token not found', 404);
  } else {
    client.activationToken = null;
    client.save();

    return res.status(200).send(normalize(client));
  }
};

// user???
const login = async (req, res) => {
  const { email, password } = req.body;
  const client = await authService.getOneBy('email', email);

  if (!client || client.password !== password) {
    throw new AppError('UnauthorizedError', 'Unauthorized access', 401);
  }

  const normalizedClient = await normalize(client);

  const accessToken = await jwtService.sign(normalizedClient);

  return res.status(200).send({ user: normalizedClient, accessToken });
};

module.exports = {
  register,
  activate,
  login,
};
