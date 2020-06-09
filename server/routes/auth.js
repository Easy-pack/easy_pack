const router = require('express').Router();
const handler = require('../handlers');




router.post('/signup/driver', handler.signUpDriver);
router.post('/signup/user', handler.signUpUser);

router.post('/login', handler.login);


module.exports = router;
