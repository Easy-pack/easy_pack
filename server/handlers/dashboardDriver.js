const db = require('../../database/index');

module.exports.ridesAndEarnings = async (req, res, next) => {
    try {
        const {
            id
        } = req.params;
        const transactions = await db.transaction.findAll({
            where: {
                driverId: id
            }
        });
        res.status(200).json(transactions)
        console.log(res.json)
    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
}