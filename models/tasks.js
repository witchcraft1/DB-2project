const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('tasks', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  state: {
    type: Sequelize.STRING
  }
})