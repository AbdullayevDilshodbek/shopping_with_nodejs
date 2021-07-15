const express = require('express')
const RuleController = require('../controllers/RuleController')
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/',auth,RuleController.index)

module.exports = router