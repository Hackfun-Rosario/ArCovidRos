const express = require('express'),
  UsersController = require('../controllers/auth-controller'),
  router = express.Router()

router.post('/registerUser', UsersController.registerUser)
router.post('/signIn', UsersController.signIn)

module.exports = router