const db = require('../../database/index');
const chalk = require('chalk');
const { UnavailableForLegalReasons } = require('http-errors');

module.exports.postNotification = async (req, res) =>{
    const transaction  = {};
    for(let key in req.body){
        transaction[key] = req.body[key]
    }
    console.log(transaction);
    const role = transaction.role === 'driver' ? 'user' : 'driver';
    const to = (role === 'driver' ? transaction.driverId : transaction.userId);
    const from =  (role === 'user' ? transaction.driverId : transaction.userId);
    const notification = (to === undefined ? 'new transaction' : 'transaction done');
    for(let key in req.body){
        console.log(chalk.green(key) + ' ' +chalk.greenBright(req.body[key]));
    }
    try{
        const drivers = await db.driver.findAll()
        let driversId = drivers.map(element => element.id);
        driversId.forEach(async (element) => {
            await db.notification.create({
                notif : notification,
                role,
                to : element,
                from,
                seen : false
            })
        });
        res.status(201).json({
            message : 'sucess'
        })
    } catch(error){
        res.status(500).json({
            error : `failed ${error}`
        })
    }
}

module.exports.getNotification = async (req, res) =>{
    const { id, role } = req.body;
    console.log(chalk.red('request is here'))
    console.log(chalk.blue(id)+ ' ' + chalk.blue(role));
    try{
        const notifications = await db.notification.findAll({
            where : {
                to : id,
                role,
                seen : false
            }
        })
        res.status(200).json({
            notifications
        })
    } catch(err){
        res.status(500).json({
            error : `failed ${err}`
        })
    }
}

module.exports.updateNotification = async (req, res)=>{
    const { id } = req.body;
    try{
        const notif = await db.notification.findOne({
            where : {
                id
            }
        })

        await notif.update({
            seen : true
        })
        
        res.status(202).json({
            notif
        })
    } catch(error){
        res.status(500).json({
            error : `error ${error}`
        })
    }
}