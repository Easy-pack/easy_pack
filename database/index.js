const db = require('sequelize');
const config = require('./database.config')

const sql = new db(config.database_name, config.username, config.password, {
    dialect: config.dialect
});