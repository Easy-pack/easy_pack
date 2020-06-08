const router = require('express').Router();
const handler = require('../handlers');

router.get('/profile/:id', handler.getInfo);
router.post('/profile/editPsw/:id', handler.updatePassword);


module.exports = router;
