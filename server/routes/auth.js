const router = require('express').Router();
const handler = require('../handlers');

router.post('/signup/driver', handler.signupDriver);
router.post('/signup/user', handler.signupUser);


module.exports = router;
