const db = require('../../database/index');
const bcrypt = require("bcryptjs");

module.exports.acceptTransaction = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const transId = req.body.id;
        const vehicle_Id = req.body.vehicle_Id;

        const transaction = await db.transaction.findOne({
            where: {
                id: transId
            }
        });
        transaction.update({
            driverId: id,
            vehicleId: vehicle_Id,
            state: "In Progress"
        });
        res.status(202).json(transaction)

    } catch (e) {

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
            res.status(404).json("Driver doesn't exist");
        } else {
            res.status(200).json({
                driver,
            });
        }
    } catch (e) {
        res.status(400);
        next(e);
    }
};

exports.updateDriver = async (req, res, next) => {
    console.log("body driver0 ", req.body);
    try {
        console.log(req.body)
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let driver = await db.driver.findOne({
            where: {
                id: req.params.id
            }
        })
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
        res.status(404).json({
            errorrr: e,
        });
    }
};


module.exports.getDriverTransactions = async (req, res, next) => {
    try {
        const {id} = req.params;
        const transactions = await db.transaction.findAll({where : {driverId : id} });
        res.status(200).json(transactions)
    }
    catch (e) {
        console.log(e);
        next(e)
    }
};