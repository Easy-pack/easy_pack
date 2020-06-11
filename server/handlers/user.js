const db = require('../../database/index');
const bcrypt = require('bcryptjs');

module.exports.getInfo = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const user = await db.user.findOne({where :{id: id}});
        res.status(200).json(user)

    }
    catch (e) {
        res.status(400).json({'error ':e});
        next(e)
    }
};
module.exports.updatePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.user.findOne({where :{id: id}});
        if(bcrypt.hashSync(req.body.currentPassword, 10) === user.password){
            user.update({
                password: bcrypt.hashSync(req.body.newPassword, 10)
            });
            res.status(200).json('your password has been updated')
        }
        else{
            res.status(202).json('')
        }
    }
    catch (e) {
        console.log('error onUpdatingPassword: ', e);
        next(e)
    }
};

module.exports.updateInfo = async (req, res, next) =>{
    try {
        console.log(req.body)
        let newInfo = {
            first_name,
            last_name,
            email,
            address,
            phone,
            cin,
            vat_number,
        } = req.body;
        if(req.body.newPassword){
            newInfo.password = bcrypt.hashSync(req.body.newPassword, 10)
        }
        const id = req.params.id;
        const user = await db.user.findOne({where :{id: id}});
        user.update(
            newInfo
        );
        console.log(newInfo)
        res.status(202).json(newInfo)

    }
    catch (e) {
        res.status(400).json({'error ':e});
        next(e)
    }
};
