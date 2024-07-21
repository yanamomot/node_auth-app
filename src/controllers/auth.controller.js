const { sendActivationEmail } = require('../services/email.service.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const tokenServise = require('../services/token.service.js');

const authService = require('../services/auth.service.js');
const jwtService = require('../services/jwt.service.js');

const {
  normalize,
  emailValidation,
  passwordValidation,
  generateTokens,
} = require('../utils/helper.js');

const ApiError = require('../utils/apiError.js');
const TypeErrorMessages = require('../utils/errMessages.js');

const register = async (req, res) => {
  const { email, password } = req.body;

  const errors = {
    email: emailValidation(email),
    password: passwordValidation(password),
  };

  if (errors.email || errors.password) {
    throw ApiError.badRequest(TypeErrorMessages.BadRequest, errors);
  }

  const isExist = await authService.getOneBy('email', email);

  if (isExist) {
    throw ApiError.badRequest(TypeErrorMessages.IsUserExist, {
      email: TypeErrorMessages.IsUserExist,
    });
  }

  const activationToken = `${uuidv4()}${uuidv4()}${uuidv4()}${uuidv4()}`;

  const hashedPass = await bcrypt.hash(password, 10);

  await authService.create(email, hashedPass, activationToken);

  await sendActivationEmail(email, activationToken);

  return res.status(200).send({ message: TypeErrorMessages.Created });
};

const activate = async (req, res) => {
  const { activationToken } = req.params;
  const client = await authService.getOneBy('token', activationToken);

  if (!client) {
    throw ApiError.notFound(TypeErrorMessages.UserNotFound, {
      email: TypeErrorMessages.UserNotFound,
    });
  }
  client.activationToken = null;
  await client.save();

  return res.status(200).send(normalize(client));
};

// user???
const login = async (req, res) => {
  const { email, password } = req.body;

  const errors = {
    email: emailValidation(email),
    password: passwordValidation(password),
  };

  if (errors.email || errors.password) {
    throw ApiError.badRequest(TypeErrorMessages.BadRequest, errors);
  }

  const client = await authService.getOneBy('email', email);

  if (!client) {
    throw ApiError.badRequest(TypeErrorMessages.UserNotFound, {
      email: TypeErrorMessages.UserNotFound,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, client.password);

  if (!isPasswordValid) {
    throw ApiError.notFound(TypeErrorMessages.WrongPassword, {
      password: TypeErrorMessages.WrongPassword,
    });
  }

  // const normalizedClient = await normalize('withActToken', client);

  // if (client.activationToken) {
  //   throw ApiError.unauthorized({ email: TypeErrorMessages.ReqVerify });
  // }

  const result = await generateTokens(res, client);

  return result;
};

const logout = async () => {};

const refresh = async (req, res) => {
  const { refreshToken } = req.cookies;

  const userData = await jwtService.verifyRefresh(refreshToken);
  const token = await tokenServise.getByToken(refreshToken);

  if (!userData || !token) {
    throw ApiError.unauthorized({ email: TypeErrorMessages.ReqAuthorize });
  }

  const user = await authService.getOneBy('email', userData.email);

  const result = await generateTokens(res, user);

  return result;
};

module.exports = {
  register,
  activate,
  login,
  logout,
  refresh,
};
