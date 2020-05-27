const bcrypt = requie('bcrypt')
exports.signup = async (req, res) => {
    var hashedPassword = bcrypt.hash(req.body.password, salt, (err, hash) => {

    });
    var driver = await db.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hashedPassword,
        birth_date: req.body.birth_date,
        adress: req.body.adress,
        gender: req.body.gender,
        email: req.body.email,
        cin: req.body.cin,
        rate: req.body.rate,
        state: req.body.state,
        photo: req.body.photo,
    })
}