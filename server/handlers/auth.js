const bcrypt = require('bcryptjs');
const db = require('../../database');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

exports.signUpDriver = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const driverEmail = await db.driver.findOne({where: {email}});
        const userEmail = await db.user.findOne({where: {email}});

        if (userEmail || driverEmail) {
            return res.status(409).json("user exist")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const profile = {...req.body}
        profile.password = hashedPassword
        await db.driver.create(profile);
        
        res.status(201).json({success: 'User created successfully'});
        
    } catch (e) {
        res.status(404).json({error: e});
    }
};

exports.signUpUser = async (req, res) => {
    
    try {
        const {
            email
        } = req.body;
        const driverEmail = await db.driver.findOne({where: {email}});
        const userEmail = await db.user.findOne({where: {email}});

        if (userEmail || driverEmail) {
            return res.status(409).json("user exist")
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const profile = {...req.body}
        console.log('heeeeeere', profile)
        profile.password = hashedPassword
        await db.user.create(profile);
        res.status(201).json({
            success: 'User created successfully'
        });
    } catch (e) {
        res.status(409).json({
            error: e
        });
    }

};

exports.login = async (req, res) => {

    try {
        let role ="user";
        const {
            email,
            password
        } = req.body;
        let user = await db.user.findOne({where: {email}});
        
        if (!user) {
            user = await db.driver.findOne({where: {email}});
            (!user)? res.status(409).json({message: 'user not found'}) : role = "driver"
        }

        if(user) {
            let validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(409).json({message: 'Wrong password'});
            }
            else {
                let token = jwt.sign({
                    id: user.id,
                    role: role
                }, 'process.env.SECRET');
                res.status(201).json({
                    message: 'Sucessfully logged in',
                    id: user.id,
                    role,
                    token
                })
            }
        }
    } catch (e) {
        res.status(409).json({
            message: 'error'
        })
    }
};
