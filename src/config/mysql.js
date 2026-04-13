const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('app_clientes', 'root', 'rootpassword', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;