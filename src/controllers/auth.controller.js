const { sendActivationEmail } = require('../services/email.service.js');
const authService = require('../services/auth.service.js');
const jwtService = require('../services/jwt.service.js');
const { normalize } = require('../helper/normalize.js');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const activationToken = `${uuidv4()}${uuidv4()}${uuidv4()}${uuidv4()}`;
    const newUser = await authService.create(email, password, activationToken);

    await sendActivationEmail(email, activationToken);

    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const activate = async (req, res) => {
  try {
    const { activationToken } = req.params;
    const client = await authService.getOneBy('token', activationToken);

    if (!client) {
      return res.status(404).send();
    } else {
      client.activationToken = null;
      client.save();

      return res.status(200).send(normalize(client));
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// user???
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await authService.getOneBy('email', email);

    if (!client || client.password !== password) {
      return res.status(401).send();
    }

    const normalizedClient = await normalize(client);

    const accessToken = await jwtService.sign(normalizedClient);

    return res.status(200).send({ user: normalizedClient, accessToken });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  register,
  activate,
  login,
};
