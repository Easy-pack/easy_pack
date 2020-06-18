const db = require('../../database/index');

const bcrypt = require('bcryptjs');
const createError = require('http-errors')

module.exports.getInfo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.user.findOne({
            where: {
                id: id
            }
        });
        if (!user) throw createError(404, `user not found`);
        res.status(200).json(user)

    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
};

module.exports.updatePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.user.findOne({
            where: {
                id: id
            }
        });
        if (!user) throw createError(404, `user not found`);
        if (bcrypt.hashSync(req.body.currentPassword, 10) !== user.password) {
            throw createError(401, `wrong Password`);
        }
        if (bcrypt.hashSync(req.body.currentPassword, 10) === user.password) {
            user.update({
                password: bcrypt.hashSync(req.body.newPassword, 10)
            });
            res.status(200).json('your password has been updated')
        }
    } catch (e) {
        console.log('error onUpdatingPassword: ', e);
        res.status(e.status).json({
            error: e.message
        });
    }
};

module.exports.updateInfo = async (req, res, next) => {
    try {
        console.log(req.body)
        let newInfo = {
            first_name,
            last_name,
            email,
            address,
            city,
            zip,
            longitude,
            latitude,
            phone,
            cin,
            vat_number,
        } = req.body;
        if (req.body.newPassword) {
            newInfo.password = bcrypt.hashSync(req.body.newPassword, 10)
        }
        const id = req.params.id;
        const user = await db.user.findOne({
            where: {
                id: id
            }
        });
        user.update(
            newInfo
        );
        if (!user) throw createError(404, `user not found`);
        console.log(newInfo)
        res.status(202).json(newInfo)

    } catch (e) {
        res.status(e.status).json({
            error: e.message
        });
    }
};