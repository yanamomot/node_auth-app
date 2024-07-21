const express = require('express');
const authController = require('../controllers/auth.controller.js');
const catchError = require('../utils/catchError.js');

const authRouter = express.Router();

authRouter.post('/registration', catchError(authController.register));
authRouter.post('/login', catchError(authController.login));
authRouter.post('/logout', catchError(authController.logout));

authRouter.get('/refresh', catchError(authController.refresh));

authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);

module.exports = {
  authRouter,
};
