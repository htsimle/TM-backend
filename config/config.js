const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('taskmanager', 'taskmanager', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
