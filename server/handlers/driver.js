const db = require('../../database/index');

const bcrypt = require("bcryptjs");
const chalk = require('chalk');
const createError = require('http-errors')


module.exports.acceptTransaction = async (req, res, next) => {
    console.log(chalk.blue('Request is here'));
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

        if (!transaction) throw createError(404, `transaction not found`);

        transaction.update({
            driverId: id,
            //vehicleId: vehicle_Id,
            state: "In Progress"
        });

        res.status(202).json(transaction)

    } catch (e) {
        res.status(e.status).json({error: e.message});
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

module.exports.getDriverVehicles = async (req, res, next) => {
    try {
        const {id} = req.params;
        const vehicles = await db.vehicle.findAll({where : {driverId : id} });

        if (!vehicles) throw createError(404, `vehicles not found`);

        res.status(200).json(vehicles)
    }
    catch (e) {
        res.status(e.status).json({error: e.message});
    }
}




module.exports.addVehicle = async (req,res,next)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const vehicles = {
            type,
            reg_number,
            license_plate,
            color,
            make,
            model
        } = req.body;

        for(let key in vehicles){
            console.log(chalk.blue(key + ' '+ vehicles[key]));
        }
        vehicles.driverId = id

        const vehicle = await db.vehicle.create(vehicles);

        if(!vehicle) throw createError(404, `vehicle not created`);

        res.status(201).json(vehicle);
    }
    catch (e) {
        res.status(e.status).json({error: e.message});
    }
};