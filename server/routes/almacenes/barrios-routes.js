const express = require('express'),
  BarriosController = require('../../controllers/almacenes/barrios-controller')
  router = express.Router()

router.post('/barrio', BarriosController.createBarrio)
router.get('/barrios', BarriosController.getAllBarrios)

module.exports = router