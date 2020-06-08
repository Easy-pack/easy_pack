module.exports = (sql, Sequelize) => {
    const user = sql.define('user', {
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: Sequelize.INT,
        address: Sequelize.STRING,
        cin: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        photo: Sequelize.BLOB,
        Vat_Number: Sequelize.STRING
    });
    return user;
};
