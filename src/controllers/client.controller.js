const clientService = require('../services/client.service');

const get = async (req, res) => {
  const result = await clientService.getAllActivated();

  return res.status(200).send(result);
};

module.exports = {
  get,
};
