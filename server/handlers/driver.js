const db = require('../../database/index');

const bcrypt = require("bcryptjs");
const chalk = require('chalk');
const createError = require('http-errors');



module.exports.acceptTransaction = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const transId = req.body.transactionId;
        //const vehicle_Id = req.body.vehicle_Id;

        const transaction = await db.transaction.findOne({
            where: {
                id: transId
            }
        });

        const driver = await db.driver.findOne({
            where :{
                id
            }
        })

        if (!transaction) throw createError(404, `transaction not found`);

        await transaction.update({
            driverId: id,
            //vehicleId: vehicle_Id,
            state: "In Progress",
            //  update date
            // start_time : Date.now()
        });

        await driver.update({
            state : 'not available'
        })

        res.status(202).json(transaction)

    } catch (e) {
        res.status(e.status).json({error: e.message});
    }
}

module.exports.doneTransaction = async (req, res, next)=>{
    const {driverId, transactionId} = req.body;
    try{
        const driver = await db.driver.findOne({
            where : {
                id : driverId
            }
        })

        const transaction = await db.transaction.findOne({
            where : {
                id : transactionId
            }
        })

        await driver.update({
            state : 'available'
        });

        await transaction.update({
          state : 'completed',
          //end_time : ''
          // date update
        })

        res.status(202).json({
            message : 'transaction done'
        })
    } catch(error){
        res.status(500).json({
            error : 'error : '+ error
        })
    }
}




exports.getDriver = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const driver = await db.driver.findOne({
            where: {
                id: id,
            },
        });
        if (!driver) {
            throw createError(404, `Driver doesn't exist`);
        } else {
            res.status(200).json({
                driver,
            });
        }
    } catch (e) {
        res.status(e.status).json({error: e.message});
    }
};

exports.updateDriver = async (req, res, next) => {
    console.log("body driver0 ", req.body);
    try {
        console.log(req.body)
        let driver = await db.driver.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!driver) throw createError(404, `driver not found`);

        await driver.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            birth_date: req.body.birth_date,
            adress: req.body.adress,
            gender: req.body.gender,
            email: req.body.email,
            // cin: req.body.cin,
            photo: req.body.photo,
            phone: req.body.phone,
            // rate: req.body.rate,
            // state:eq.body.state

        });

        res.status(201).json({
            success: "Driver updated successfully",
            driver: driver
        });
    } catch (e) {
        //console.log(e)
        res.status(e.status).json({error: e.message});
    }
};


module.exports.getDriverTransactions = async (req, res, next) => {
    try {
        const {id} = req.params;
        const transactions = await db.transaction.findAll({where : {driverId : id} });

        if (!transactions) throw createError(404, `transaction not found`);
        
        res.status(200).json(transactions)
    }
    catch (e) {
        res.status(e.status).json({error: e.message});
    }
};