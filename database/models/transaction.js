module.exports = (sql, Sequelize) => {
    const transaction = sql.define('transaction', {
        request_time: Sequelize.TIME,
        request_date: Sequelize.DATE,
        start_time: Sequelize.TIME,
        end_time: Sequelize.TIME,
        waiting_time: Sequelize.TIME,
        package_dimension: Sequelize.STRING,
        package_weight: Sequelize.INTEGER,
        package_comments: Sequelize.STRING,
        address_start: Sequelize.STRING,
        city_start: Sequelize.STRING,
        zip_start: Sequelize.STRING,
        longitude_start: Sequelize.FLOAT,
        latitude_start: Sequelize.FLOAT,
        address_destination: Sequelize.STRING,
        city_destination: Sequelize.STRING,
        zip_destination: Sequelize.STRING,
        longitude_destination: Sequelize.FLOAT,
        latitude_destination: Sequelize.FLOAT,
        state: {
            type: Sequelize.STRING,
            defaultValue: 'Pending'
        },
        price: Sequelize.FLOAT,
    });
    return transaction;
};