module.exports = (sql,  Sequelize) =>{
    const vehicles = sql.define({
        type: Sequelize.STRING,
        license_plate : Sequelize.STRING,
        Reg_number: Sequelize.NUMBER,
    })
};

