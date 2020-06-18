const Sequelize = require('sequelize');
const config = require('./database.config');

const sql = new Sequelize(config.database_name, config.username, config.password, {
    dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sql = sql;

db.driver = require('./models/driver')(sql, Sequelize);
db.vehicle = require('./models/vehicle')(sql, Sequelize);
db.user = require('./models/user')(sql, Sequelize);
db.payment = require('./models/payment')(sql, Sequelize);
db.transaction = require('./models/transaction')(sql, Sequelize);
db.notification = require('./models/notification')(sql, Sequelize);

db.driver.hasMany(db.vehicle);
db.vehicle.belongsTo(db.driver);

db.driver.hasMany(db.transaction);
db.transaction.belongsTo(db.driver);

db.transaction.belongsTo(db.vehicle);
db.vehicle.hasMany(db.transaction);

db.transaction.hasOne(db.payment);
db.payment.belongsTo(db.transaction);

db.transaction.belongsTo(db.user);
db.user.hasMany(db.transaction);

module.exports = db;
