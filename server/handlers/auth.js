const bcrypt = require('bcryptjs')
const db = require('../../database')
exports.signup = async (req, res) => {
    const {
        email
    } = req.body

    if (db['driver'].findOne({
            where: {
                email
            }
        }) ||
        db['user'].findOne({
            where: {
                email
            }
        })) {
        return res.status(409).json("user exist")
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    let driver = db.driver.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        birth_date: req.body.birth_date,
        adress: req.body.adress,
        gender: req.body.gender,
        email: email,
        cin: req.body.cin,
        rate: req.body.rate,
        state: req.body.state,
        photo: req.body.photo,
    })
    res.state(201).json('User created successfully')

}