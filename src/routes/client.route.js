const express = require('express');
const clientController = require('../controllers/client.controller.js');

const clientRouter = express.Router();

clientRouter.get('/', clientController.get);

module.exports = {
  clientRouter,
};
