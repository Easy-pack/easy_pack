const router = require('express').Router();
const handler = require('../handlers');
const multer = require('multer');
const chalk = require('chalk');
const path = require('path');
const PATH = 'server/public/images/'

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, PATH);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`);
    }
})

let upload = multer({
    storage: storage
});

router.post('/signup/driver', upload.single('avatar'), handler.signUpDriver);
router.post('/signup/user', upload.single('avatar'), handler.signUpUser);

router.post('/login', handler.login);


module.exports = router;