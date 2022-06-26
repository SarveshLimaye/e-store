const express = require('express')
const router = express.Router()

const {getAllUsers ,addUser} = require('../controllers/user')

router.route('/').get(getAllUsers)
router.route('/addUser').post(addUser)

module.exports = router