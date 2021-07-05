const express = require('express')
const user_controller = require('../controllers/user.controller')
const router = express.Router()

router.post('/',user_controller.create)

module.exports = router