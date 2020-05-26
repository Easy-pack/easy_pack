module.exports = (sql, Sequelize) =>{
    const transaction = sql.define({
        Request_time: Sequelize.TIME,
        Request_Date: Sequelize.DATE,
        Start_time: Sequelize.TIME,
        End_Time: Sequelize.Time,
        waiting_time: Sequelize.Time,
        Package_dimension: Sequelize.NUMBER,
        Package_weight: Sequelize.NUMBER,
        Package_type: Sequelize.STRING,
        Address_start: Sequelize.STRING,
        Address_destination: Sequelize.STRING,
        state: Sequelize.STRING,
        price: Sequelize.NUMBER,
    })
}