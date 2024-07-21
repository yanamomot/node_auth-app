const { Token } = require('../models/Token.model');

const save = async (userId, newToken) => {
  const token = await Token.findOne({ where: { userId } });

  if (!token) {
    await Token.create({ userId, refreshToken: newToken });

    return;
  }

  token.refreshToken = newToken;
  await token.save();
};

const getByToken = async (refreshToken) => {
  const result = await Token.findOne({ where: { refreshToken } });

  return result;
};

module.exports = {
  save,
  getByToken,
};
