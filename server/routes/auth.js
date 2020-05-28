const router = require('express').Router();
const handler = require('../handlers');

router.post('/signup/driver', handler.signupDriver);
router.post('/signup/user', handler.signupUser);

router.post('/login/driver', handler.loginDriver);
router.post('/login/user', handler.loginUser);


module.exports = router;
