const Almacen = require('../../models/almacenes/almacen-model'),
  Barrio = require('../../models/almacenes/barrio-model')
  responses = require('../../responses')

const createAlmacen = async (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json(responses.faltanDatos)
  }

  const almacen = await Almacen.findOneAndUpdate(
    {nombre: body.nombre},
    body,
    {upsert: true},
    (err) => {
      if(err) {
        console.log(err)
        return res.status(400).json(responses.errorAlCargar)
      }
    }
  )

  return res.status(201).json(responses.responseData(almacen))
}

const getAllAlmacenes = async (req, res) => {

  const almacenes = await Almacen.find()

  return res.status(200).json(responses.responseData(almacenes))
}

const findAlmacenesByBarrio = async (req, res) => {
  const reqBarrio = req.params.barrio

  if(!reqBarrio) {
    return res.status(400).json(responses.faltanDatos)
  }

  const barrio = await Barrio.findById(reqBarrio)
  if (!barrio) {
    return res.status(200).json(responses.responseData([]))
  }

  const almacenes = await Almacen.find({
    geojson: {
      $geoWithin: {
        $geometry: 
          barrio.geojson
        }
      }
    }
  )

  return res.status(200).json(responses.responseData(almacenes))
}

const findAlmacenesNearMe = async (req, res) => {
  const lat = parseFloat(req.query.lat),
      lng = parseFloat(req.query.lng)

  if(!lat && !lng) {
    return res.status(400).json(responses.faltanDatos)
  }
  const reqBarrio = req.params.barrio

  let almacenes = await Almacen.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point", 
          coordinates: [lng, lat]
        },
        distanceField: "distancia",
        spherical: true,
        maxDistance: 5000
      }
    }
  ])

  almacenes = almacenes.sort((x, y) => x-y)

  return res.status(200).json(responses.responseData(almacenes))

 
}

module.exports = {
  createAlmacen,
  findAlmacenesByBarrio,
  findAlmacenesNearMe,
  getAllAlmacenes
}