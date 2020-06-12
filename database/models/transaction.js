module.exports = (sql, Sequelize) =>{
    const transaction = sql.define('transaction',{
        request_time: Sequelize.TIME,
        request_date: Sequelize.DATE,
        start_time: Sequelize.TIME,
        end_time: Sequelize.TIME,
        waiting_time: Sequelize.TIME,
        package_dimension: Sequelize.STRING,
        package_weight: Sequelize.INTEGER,
        package_comments: Sequelize.STRING,
        address_start: Sequelize.STRING,
        address_destination: Sequelize.STRING,
        state: {
            type : Sequelize.STRING,
            defaultValue: 'Pending'
        },
        price: Sequelize.FLOAT,
    });
    return transaction;
};
