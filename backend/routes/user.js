const express = require('express')
const router = express.Router()

const {getAllUsers ,addUser , updateCart,getUserbyId , getCart} = require('../controllers/user')

router.route('/').get(getAllUsers)
router.route('/addUser').post(addUser)
router.route('/updateCart').put(updateCart)
router.route('/:id').get(getUserbyId)
router.route('/cart/:email').get(getCart)

module.exports = router