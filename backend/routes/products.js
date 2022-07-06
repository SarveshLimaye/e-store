const express = require('express')
const router = express.Router()

const {getAllProducts, getAllStaticProducts , searchProducts , getProductbyId} = require('../controllers/product')

// console.log(getAllProducts)

router.route('/').get(getAllProducts)
router.route('/static').get(getAllStaticProducts)
router.route('/search').get(searchProducts)
router.route('/:id').get(getProductbyId)

module.exports = router