const router = require('express').Router();
const handler = require('../handlers');

router.get('/profile/:id', handler.getInfo);
router.post('/profile/:id', handler.updateInfo);


module.exports = router;
