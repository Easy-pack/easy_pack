module.exports = (sql, Sequelize) => {
    const user = sql.define('user', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: Sequelize.INTEGER,
        address: Sequelize.STRING,
        cin: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password : Sequelize.STRING,
        photo: Sequelize.STRING,
        vat_number: Sequelize.STRING
    });
    return user;
};