module.exports = (sql, Sequelize) => {
    const vehicle = sql.define('vehicle', {
        type: Sequelize.STRING,
        reg_number: Sequelize.STRING,
        license_plate: Sequelize.STRING,
    });
    return vehicle;
};