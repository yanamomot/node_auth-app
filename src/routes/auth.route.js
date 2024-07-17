const express = require('express');
const authController = require('../controllers/auth.controller.js');

const authRouter = express.Router();

authRouter.post('/registration', authController.register);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.get('/login', authController.login);

module.exports = {
  authRouter,
};
