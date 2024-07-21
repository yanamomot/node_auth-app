const express = require('express');
const clientController = require('../controllers/client.controller.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');
const catchError = require('../utils/catchError.js');

const clientRouter = express.Router();

clientRouter.get('/', authMiddleware, catchError(clientController.get));

module.exports = {
  clientRouter,
};
