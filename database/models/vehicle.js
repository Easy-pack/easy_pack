module.exports = (sql, Sequelize) => {
    const vehicle = sql.define({
        type: Sequelize.STRING,
        reg_number: Sequelize.STRING,
        license_plate: Sequelize.STRING,

    })
}