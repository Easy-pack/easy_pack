const router = require('express').Router();
const handler = require('../handlers');

router.get('/profile/:id', handler.getInfo);
router.post('/profile/:id', handler.updateInfo);

router.get('/board/:id', handler.detailDashboardUser)
module.exports = router;
