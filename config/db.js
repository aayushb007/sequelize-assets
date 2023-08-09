const { Sequelize } = require('sequelize');
//define 
const sequelize = new Sequelize('workmen_asset', 'root', 'aayush@123', {
  // host:'mysqldb',
  dialect: 'mysql', 
});

module.exports = sequelize;