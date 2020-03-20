const express = require('express'),
  StatsController = require('../controllers/stats-controller'),
  router = express.Router()

router.post('/stats', StatsController.createStat)

module.exports = router