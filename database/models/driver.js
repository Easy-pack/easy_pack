module.exports = (sql, Sequelize) => {
    const driver = sql.define('driver', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password: Sequelize.STRING,

        birth_date: Sequelize.DATE,
        adress: Sequelize.STRING,
        gender: Sequelize.STRING,
        state: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: Sequelize.STRING,
        cin: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        rate: Sequelize.FLOAT,
        state: Sequelize.STRING,
        photo: Sequelize.BLOB,
    });
    return driver;
};