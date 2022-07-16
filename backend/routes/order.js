const express = require('express')
const router = express.Router()

const {getAllOrders,addOrder , getOrderByMail} = require('../controllers/order')

router.route('/').get(getAllOrders)
router.route('/add').post(addOrder)
router.route('/:email').get(getOrderByMail)

module.exports = router