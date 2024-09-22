const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('devshare_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;