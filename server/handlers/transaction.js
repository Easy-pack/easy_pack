const chalk = require('chalk');
const createError = require('http-errors')

const db = require('../../database/index');

module.exports.postTransaction = async (req, res, next) => {
    try {
        const trans = {
            request_time,
            request_date,
            package_dimension,
            package_weight,
            package_type,
            address_start,
            city_start,
            zip_start,
            longitude_start,
            latitude_start,
            address_destination,
            city_destination,
            zip_destination,
            longitude_destination,
            latitude_destination,
            userId
        } = req.body;

        for (let key in req.body) {
            console.log(chalk.blue(key + ' ' + req.body[key]));
        }
        const transaction = await db.transaction.create(trans);

        if (!transaction) throw createError(404, `transaction not created`);

        res.status(201).json(transaction);
    } catch (e) {
        res.status(400).json({
            error: e.message
        });
    }
};

module.exports.getUserTransactions = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const transactions = await db.transaction.findAll({
            where: {
                userId: id
            },
            include: [
                db.driver
            ]
        });

        if (!transactions) throw createError(404, `transactions not found`)

        res.status(200).json(transactions)
    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
};

// all transactions
module.exports.getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await db.transaction.findAll({
            where: {
                driverId: null
            },

        });
        console.log(transactions)
        if (!transactions) throw createError(404, `transactions not found`);
        res.status(200).json(transactions)
    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
};


module.exports.cancel = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const transId = req.body.id;
        const role = req.body.role;
        if (role === 'user') {
            const transaction = await db.transaction.findOne({
                where: {
                    userId: id,
                    id: transId
                }
            });
            if (!transaction) throw createError(404, `transaction not found`)
            transaction.update({
                state: 'Canceled'
            });
            res.status(202).json(transaction)
        }
        if (role === 'driver') {
            // find another driver
        }

    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
};