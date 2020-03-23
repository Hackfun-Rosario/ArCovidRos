const express = require('express'),
  UsersController = require('../controllers/auth-controller'),
  adminMiddleware = require('../middlewares/has-admin-key'),
  router = express.Router()

router.post('/registerUser', adminMiddleware.hasAdminKey , UsersController.registerUser)
router.post('/signIn', UsersController.signIn)

module.exports = router