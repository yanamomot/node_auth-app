const { Sequelize } = require('sequelize');

require('dotenv/config');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const client = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: 'postgres',
});

module.exports = {
  client,
};
