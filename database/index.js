const Sequelize = require('sequelize');
const config = require('./database.config');

const driver = require('./models/driver');
const vehicle = require('./models/vehicle');
const transaction = require('./models/transaction');
const payment = require('./models/payment');
const user = require('./models/user');

const sql = new Sequelize(config.database_name, config.username, config.password, {
    dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sql = sql;
db.driver = driver(sql, Sequelize);
db.vehicle = vehicle(sql, Sequelize);
db.user = user(sql, Sequelize);
db.payment = payment(sql, Sequelize);
db.transaction = transaction(sql, Sequelize);


 module.exports = db;
