const router = require('express').Router();
const handler = require('../handlers');

router.post('/post', handler.postTransaction);

router.post('/donetransaction', handler.doneTransaction);

router.route('/tr/:id')
    .get(handler.getDriverTransactions)
    .post(handler.acceptTransaction)
    .put(handler.cancel);

router.get('/:id', handler.getDriver);
router.post('/:id', handler.updateDriver);

module.exports = router;