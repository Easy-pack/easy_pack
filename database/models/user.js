module.exports = (sql,  Sequelize) =>{
    const user = sql.define({
        first_name : Sequelize.STRING,
        last_name : Sequelize.STRING,
        email : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true 
        },
        phone : Sequelize.INGEGER,
        adress : Sequelize.STRING,
        cin : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true
        },
        phone : Sequelize.STRING,
        Vat_Number : Sequelize.STRING
    })
}