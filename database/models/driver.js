module.exports = (sql, Sequelize) => {
    const driver = sql.define('driver', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password: Sequelize.STRING,
        phone: Sequelize.INTEGER,
        birth_date: Sequelize.DATE,
        address: Sequelize.STRING,
        gender: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
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
