const express = require('express');
const authController = require('../controllers/auth.controller.js');

const authRouter = express.Router();

authRouter.post('/registration', authController.register);

module.exports = {
  authRouter,
};
