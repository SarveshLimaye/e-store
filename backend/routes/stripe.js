const express = require('express')
const router = express.Router()

const {payment} = require('../controllers/stripe')

router.post('/create-checkout-session',payment)

module.exports = router