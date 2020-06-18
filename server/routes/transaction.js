const router = require('express').Router();
const handler = require('../handlers');

router.post('/', handler.postTransaction);

router.route('/tr/:id')
    .get(handler.getUserTransactions)
    .put(handler.cancel);

router.route('/tr')
    .get(handler.getAllTransactions)


module.exports = router;
