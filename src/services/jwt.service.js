const jwt = require('jsonwebtoken');

require('dotenv/config');

const sign = async (client) => {
  try {
    const token = await jwt.sign(client, process.env.JWT_KEY, {
      expiresIn: '5s',
    });

    return token;
  } catch (err) {
    return null;
  }
};

const verify = async (token) => {
  try {
    const result = await jwt.verify(token, process.env.JWT_KEY);

    return result;
  } catch (err) {
    return null;
  }
};

const signRefresh = async (client) => {
  try {
    const token = await jwt.sign(client, process.env.JWT_REFRESH_KEY);

    return token;
  } catch (err) {
    return null;
  }
};

const verifyRefresh = async (token) => {
  try {
    const result = await jwt.verify(token, process.env.JWT_REFRESH_KEY);

    return result;
  } catch (err) {
    return null;
  }
};

module.exports = {
  sign,
  verify,
  signRefresh,
  verifyRefresh,
};
