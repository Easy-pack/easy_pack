const router = require('express').Router();
const handler = require('../handlers');
const multer = require('multer');
const chalk = require('chalk');
const path = require('path');
<<<<<<< HEAD
const PATH = 'server/public/image/';
=======
const PATH = 'public/images/'
>>>>>>> 6a605c9ded83213437c52c4fb62a70666b79d2fa

let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, PATH);
    },
    filename : function(req, file, cb){
        cb(null, `${Date.now()}${file.originalname}`);
    }
})

let upload = multer({
    storage : storage
});

router.post('/signup/driver', upload.single('avatar'), handler.signUpDriver);
router.post('/signup/user', upload.single('avatar'), handler.signUpUser);

router.post('/login', handler.login);


module.exports = router;
