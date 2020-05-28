const db = require('../../database/index');

module.exports.postTransaction = async (req,res,next)=>{
    try{
        const trans = {
            request_time,
            request_date,
            package_dimension,
            package_weight,
            package_type,
            address_start,
            address_destination,
            userId
        } = req.body;

        const transaction = await db.transaction.create(trans);
        res.status(201).json(transaction);
    }
    catch (e) {
        console.log(e);
        next(e)
    }
};

module.exports.getUserTransactions = async (req, res, next) => {
    try {
        const {id} = req.params;
        const role = req.body.role;
        if(role === 'user'){
            const transactions = await db.transaction.findAll({where : {userId : id} });
            res.status(200).json(transactions)
        }
        if(role === 'driver'){
            const transactions = await db.transaction.findAll({where : {driverId : id} });
            res.status(200).json(transactions)
        }

    }
    catch (e) {
        console.log(e);
        next(e)
    }
};


module.exports.cancel = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const transId = req.body.id;
        const role = req.body.role;
        if(role === 'user'){
            const transaction = await db.transaction.findOne({where : {userId : id, id : transId} });
            transaction.update({
                state: 'Canceled'
            });
            res.status(202).json(transaction)
        }
        if(role === 'driver'){
        // find another driver
        }

    }
    catch (e) {
        console.log(e);
        next(e)
    }
};




