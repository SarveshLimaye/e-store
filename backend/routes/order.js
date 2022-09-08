const express = require('express')
const router = express.Router()

const {getAllOrders ,getOrderbyId} = require('../controllers/order')

router.route('/').get(getAllOrders)
router.route('/:id').get(getOrderbyId)

module.exports = router