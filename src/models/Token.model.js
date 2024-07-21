const { DataTypes } = require('sequelize');
const { client } = require('../utils/db.js');
const { Client } = require('./Client.model.js');

const Token = client.define(
  'Token',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Client,
        key: 'id',
      },
    },
  },
  {
    tableName: 'tokens',
    timestamps: false,
  },
);

Token.sync();

Token.belongsTo(Client, { foreignKey: 'userId' });
Client.hasOne(Token, { foreignKey: 'userId' });

module.exports = {
  Token,
};
