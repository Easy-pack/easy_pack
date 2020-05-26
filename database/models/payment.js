module.exports = (sql,  Sequelize) =>{
    const payment = sql.define({
        type: Sequelize.STRING,
        id_Transaction: Sequelize.NUMBER,
        amount: Sequelize.NUMBER,
        card_no: Sequelize.NUMBER,
        payment_time: Sequelize.DATE,

    })
};
