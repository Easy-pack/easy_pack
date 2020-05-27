const bcrypt = require('bcryptjs')
const db = require('../../database')
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

exports.signupDriver = async (req, res) => {
    const {
        email
    } = req.body
    const driverEmail = await db['driver'].findOne({where: {email}});
    const userEmail = await db['user'].findOne({where: {email}});

    if (userEmail || driverEmail){
        return res.status(409).json("user exist")
    }

    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let driver = await db.driver.create({
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
        });
           
        res.status(201).json({success : 'User created successfully'});
    }
    catch(e){
        res.status(409).json({error : e});
    }

}

exports.signupUser = async (req, res) => {
    const {
        email
    } = req.body
    const driverEmail = await db['driver'].findOne({where: {email}});
    const userEmail = await db['user'].findOne({where: {email}});

    if (userEmail || driverEmail){
        return res.status(409).json("user exist")
    }

    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        const user = await db.user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            email: email,
            adress: req.body.adress,
            phone : req.body.phone,
            cin: req.body.cin,
            vat_number : req.body.vat_number
            //photo : req.body.photo
        });
           
        res.status(201).json({success : 'User created successfully'});
    }
    catch(e){
        res.status(409).json({error : e});
    }

}

exports.loginUser = async (req, res) => {
   
    try{
        const {email, password} = req.body;
        const user = await db['user'].findOne({where : {email}});
        if(!user){
            res.status(409).json({
                message : 'user not found'
            })
        } else {
            //console.log(chalk.red('Am I here?'));
            let validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                res.status(409).json({
                    message : 'Wrong password'
                });
            } else {
                let token = jwt.sign({id : user.id, role : 'user'}, 'process.env.SECRET');
                res.status(201).json({
                    message : 'Sucessfully logged in',
                    token
                })
            } 
        }
    } 
    catch(e){
        res.status(409).json({
            message: 'error'
        })
    }
}

exports.loginDriver = async (req, res) => {
    try{
        const {email, password} = req.body;
        const driver = await db['driver'].findOne({where : {email}});
        if(!driver){
            res.status(409).json({
                message : 'user not found'
            })
        } else {
            let validPassword = await bcrypt.compare(password, driver.password);
            if(!validPassword){
                res.status(409).json({
                    message : 'Wrong password'
                });
            } else {
                let token = jwt.sign({id : driver.id, role : 'driver'}, 'process.env.SECRET');
                res.status(201).json({
                    message : 'Sucessfully logged in',
                    token
                })
            } 
        }
    }
    catch(e){
        res.status(409).json({
            error : 'error'
        })
    }
}
