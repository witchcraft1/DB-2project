const Sequelize = require('sequelize');
const sequelize = require('../config/database')

module.exports = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  task: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  comm: {
    type: Sequelize.BOOLEAN
  },
  worbef: {
    type: Sequelize.BOOLEAN
  },
  skills: {
    type: Sequelize.BOOLEAN
  },
  knowledge: {
    type: Sequelize.BOOLEAN
  }
})