const express = require('express')
const UserController = require('../controllers/UserController')
const AuthController = require('../controllers/AuthController')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/',auth,UserController.create)
router.post('/login',AuthController.login)
router.get('/getAuthUser',auth,AuthController.get_active_user)
router.get('/', auth,UserController.index)
router.post('/attached_rule_to_user',auth,UserController.attached_rule_to_user)

module.exports = router