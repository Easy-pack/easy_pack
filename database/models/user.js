module.exports = (sql,  Sequelize) =>{
    const user = sql.define('user',{
        first_name : Sequelize.STRING,
        last_name : Sequelize.STRING,
        email : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true 
        },
        phone : Sequelize.NUMBER,
        address : Sequelize.STRING,
        cin : {
            type : Sequelize.STRING,
            allowNull : false,
            unique : true
        },
        phone : Sequelize.STRING,
        Vat_Number : Sequelize.STRING
    });
    return user;
};
