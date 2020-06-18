module.exports = (sql, Sequelize) => {
    const driver = sql.define('driver', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password: Sequelize.STRING,
        birth_date: Sequelize.DATEONLY,
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
        rate: {
            type: Sequelize.FLOAT,
            defaultValue: 5.0
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: "available"
        },
        photo: Sequelize.STRING,
        city: Sequelize.STRING,
        zip: Sequelize.STRING
    });
    return driver;
};