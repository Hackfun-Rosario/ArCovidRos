const express = require('express'),
  AlmacenesController = require('../../controllers/almacenes/almacenes-controller')
  router = express.Router()

router.post('/almacen', AlmacenesController.createAlmacen)
router.get('/', AlmacenesController.getAllAlmacenes)
router.get('/findAlmacenesByBarrio/:barrio', AlmacenesController.findAlmacenesByBarrio)
router.get('/findAlmacenesNearMe', AlmacenesController.findAlmacenesNearMe)
router.get('/whereInBarrioDistrito', AlmacenesController.whereInBarrioDistrito)


module.exports = router