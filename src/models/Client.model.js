const { DataTypes, UUIDV4 } = require('sequelize');
const { client } = require('../utils/db.js');

const Client = client.define(
  'Client',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    activationToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'clients',
    timestamps: false,
  },
);

module.exports = { Client };
