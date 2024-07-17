const { Client } = require('../models/Client.model.js');
const { normalize } = require('../helper/normalize.js');

const getAllActivated = async () => {
  const res = (await Client.findAll({ where: { activationToken: null } })).map(
    normalize,
  );

  return res;
};

module.exports = {
  getAllActivated,
};
