'use strict';
/* eslint-disable no-console */

const express = require('express');
const { authRouter } = require('./routes/auth.route.js');

require('dotenv/config');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3008;

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);
app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});
