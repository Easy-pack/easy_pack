const db = require('../../database/index');

module.exports.acceptTransaction = async (req, res, next) => {
    try {
        const {id} = req.params;
        const transId = req.body.id;
        const vehicle_Id = req.body.vehicle_Id;

            const transaction = await db.transaction.findOne({where : {id : transId}});
            transaction.update({
                driverId : id,
                vehicleId : vehicle_Id,
                state : "In Progress"
            });
            res.status(202).json(transaction)

    }
    catch (e) {

    }
};
