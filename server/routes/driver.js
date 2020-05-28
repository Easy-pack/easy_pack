const router = require('express').Router();
const handler = require('../handlers');

router.post('/', handler.postTransaction);

router.route('/:id')
    .post(handler.acceptTransaction)
    .put(handler.cancel);


module.exports = router;
