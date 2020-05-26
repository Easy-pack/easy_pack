module.exports = (sql, Sequelize) => {
    const driver = sql.define({
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        adress: Sequelize.STRING,
        gender: Sequelize.STRING,
        email: {
            type: db.STRING,
            allowNull: false,
            unique: true
        },
        cin: Sequelize.STRING,
        rate: Sequelize.STRING,
    })
}