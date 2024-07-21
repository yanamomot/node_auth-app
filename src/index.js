'use strict';
/* eslint-disable no-console */

const express = require('express');
const { authRouter } = require('./routes/auth.route.js');
const { clientRouter } = require('./routes/client.route.js');
const cookieParser = require('cookie-parser');

require('dotenv/config');

const cors = require('cors');
const errorMiddleware = require('./middlewares/errorMiddleware.js');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(authRouter);
app.use('/users', clientRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
