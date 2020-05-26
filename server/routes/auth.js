const router = require('express').Router()
const handler = require('../handlers')
router.post('/signup', handler.signup)