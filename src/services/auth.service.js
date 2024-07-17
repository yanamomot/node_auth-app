const { Client } = require('../models/Client.model.js');

const getOneBy = async (type, data) => {
  if (type === 'email') {
    const res = await Client.findOne({ where: { email: data } });

    return res;
  }

  if (type === 'token') {
    const res = await Client.findOne({ where: { activationToken: data } });

    return res;
  }
};

const create = async (email, password, activationToken) => {
  const res = await Client.create({ email, password, activationToken });

  return res;
};

module.exports = {
  getOneBy,
  create,
};
