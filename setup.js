/* eslint-disable no-console */
// const { User } = require('./src/models/user.model.js');
const { client } = require('./src/utils/db.js');

client
  .sync({ force: false })
  .then(() => {
    console.log('Table sync successful!');
  })
  .catch((error) => {
    console.log('Failed to sync table:', error);
  });
