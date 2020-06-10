const router = require('express').Router();
const handler = require('../handlers');

router.post('/post', handler.postTransaction);

router.route('/tr/:id')
    .post(handler.acceptTransaction)
    .put(handler.cancel);

router.get('/:id', handler.getDriver);
router.post('/:id', handler.updateDriver);

module.exports = router;