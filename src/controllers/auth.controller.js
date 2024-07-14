const { Client } = require('../models/Client.model.js');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await Client.create({ email, password });

    return res.status(200).send(newUser);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = {
  register,
};
