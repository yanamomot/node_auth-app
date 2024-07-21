const TypeErrorMessages = require('../utils/errMessages.js');
const jwtService = require('../services/jwt.service.js');
const tokenServise = require('../services/token.service.js');

const normalize = ({ id, email }) => {
  return { id, email };
};

const emailValidation = (data) => {
  if (!data) {
    return TypeErrorMessages.EmptyEmail;
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(data)) {
    return TypeErrorMessages.InvalidEmail;
  }
};

const passwordValidation = (data) => {
  if (!data) {
    return TypeErrorMessages.EmptyPassword;
  }

  if (data.length < 6) {
    return TypeErrorMessages.ShortPassword;
  }
};

const generateTokens = async (res, user) => {
  try {
    const normalizedUser = normalize(user);

    const accessToken = await jwtService.sign(normalizedUser);
    const refreshToken = await jwtService.signRefresh(normalizedUser);

    await tokenServise.save(normalizedUser.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({ user: normalizedUser, accessToken });
  } catch (err) {
    return res.status(400).send();
  }
};

module.exports = {
  normalize,
  emailValidation,
  passwordValidation,
  generateTokens,
};
