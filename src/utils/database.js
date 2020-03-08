const Sequelize = require('sequelize');

const sequelize = new Sequelize('NodeJS', 'root', 'psp2mblogmein', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
