const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('state', {
  name: {
    type: Sequelize.STRING
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  state: {
    type: Sequelize.STRING
  },
  action: {
    type: Sequelize.STRING
  },
  managed: {
    type: Sequelize.STRING
  }
});