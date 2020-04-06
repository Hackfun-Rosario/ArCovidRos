const express = require('express'),
  StatsController = require('../../controllers/covid/stats-controller'),
  AuthMiddleware = require('../../middlewares/is-authenticated')
  router = express.Router()

router.post('/stats',AuthMiddleware.isAuthenticatedMiddleware, StatsController.createStat)
router.get('/stats/:page?', StatsController.getAllStats)
router.get('/getStatByFecha/:fecha/:page?', StatsController.getStatByFecha)
router.get('/getStatByProvincia/:provincia/:page?', StatsController.getStatByProvincia)
router.get('/totals', StatsController.getTotals)
router.get('/totalsByProvincia/:provincia', StatsController.getTotalByProvincia)
router.get('/totalsByFecha/:desde/:hasta', StatsController.getTotalByFechas)
router.get('/totalsByFecha/:hasta', StatsController.getTotalByFechas)

module.exports = router