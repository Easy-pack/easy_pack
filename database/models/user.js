module.exports = (sql, Sequelize) => {
    const user = sql.define('user', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        zip: Sequelize.STRING,
        longitude: Sequelize.FLOAT,
        latitude: Sequelize.FLOAT,
        cin: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: Sequelize.STRING,
        photo: Sequelize.STRING,
        vat_number: Sequelize.STRING
    });
    return user;
};