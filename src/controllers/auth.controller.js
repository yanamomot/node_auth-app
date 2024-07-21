const { sendActivationEmail } = require('../services/email.service.js');
const authService = require('../services/auth.service.js');
const jwtService = require('../services/jwt.service.js');
const normalize = require('../helper/normalize.js');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError.js');

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw ApiError.notFound('Email is required');
  }

  if (!password) {
    throw ApiError.notFound('Password is required');
  }

  const isExist = await authService.getOneBy('email', email);

  if (isExist) {
    throw ApiError.badRequest('The user for this email already exists');
  }

  const activationToken = `${uuidv4()}${uuidv4()}${uuidv4()}${uuidv4()}`;

  await authService.create(email, password, activationToken);

  await sendActivationEmail(email, activationToken);

  return res.status(200).send({ message: 'New user created' });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const client = await authService.getOneBy('token', activationToken);

  if (!client) {
    throw ApiError.notFound('User Not Found');
  } else {
    client.activationToken = null;
    client.save();

    return res.status(200).send(normalize(client));
  }
};

// user???
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw ApiError.notFound('Email is required');
  }

  if (!password) {
    throw ApiError.notFound('Password is required');
  }

  const client = await authService.getOneBy('email', email);

  if (!client || client.password !== password) {
    throw ApiError.unauthorized('Please register to gain access');
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
