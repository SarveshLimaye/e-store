const express = require('express')
const router = express.Router()

const {getAllProducts, getAllStaticProducts} = require('../controllers/product')

// console.log(getAllProducts)

router.route('/').get(getAllProducts)
router.route('/static').get(getAllStaticProducts)

module.exports = router