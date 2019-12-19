const Sequelize = require('sequelize');

module.exports = new Sequelize('dbname', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
});