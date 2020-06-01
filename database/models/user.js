module.exports = (sql, Sequelize) => {
    const user = sql.define('user', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        password : Sequelize.STRING,
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
        photo: Sequelize.STRING,
        Vat_Number: Sequelize.STRING
    });
    return user;
};
