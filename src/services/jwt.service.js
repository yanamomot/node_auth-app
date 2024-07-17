const jwt = require('jsonwebtoken');

require('dotenv/config');

const sign = (client) => {
  try {
    const token = jwt.sign(client, process.env.JWT_KEY);

    return token;
  } catch (err) {
    return null;
  }
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return null;
  }
};

module.exports = {
  sign,
  verify,
};
