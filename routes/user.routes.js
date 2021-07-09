const express = require('express')
const user_controller = require('../controllers/user.controller')
const auth_controller = require('../controllers/auth.controller')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/',auth,user_controller.create)
router.post('/login',auth_controller.login)
router.get('/getAuthUser',auth,auth_controller.get_active_user)
router.get('/', auth,user_controller.index)
// router.get('/test', user_controller.test)

module.exports = router