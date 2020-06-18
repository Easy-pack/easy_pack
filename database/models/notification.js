

module.exports = (sql, Sequelize) => {
    const notification = sql.define('notification', {
        from : Sequelize.INTEGER,
        to : Sequelize.INTEGER,
        notif : Sequelize.STRING,
        role : Sequelize.STRING,
        seen : Sequelize.BOOLEAN
    });
    return notification;
};