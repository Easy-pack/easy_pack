module.exports = (sql,  Sequelize) =>{
    const payment = sql.define('payment',{
        type: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        card_no: Sequelize.INTEGER,
        payment_time: Sequelize.DATE,

    });
    return payment;
};

