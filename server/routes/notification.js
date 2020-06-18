const router = require('express').Router();
const handler = require('../handlers');

router.post('/post', handler.postNotification)
router.post('/get', handler.getNotification)
router.post('/update', handler.updateNotification)

module.exports = router;