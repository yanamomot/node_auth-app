const { Client } = require('../models/Client.model.js');

const getOne = async (data) => {
  const res = await Client.findOne({ where: { data } });

  return res;
};

const create = async (email, password, activationToken) => {
  const res = await Client.create({ email, password, activationToken });

  return res;
};

module.exports = {
  getOne,
  create,
};
