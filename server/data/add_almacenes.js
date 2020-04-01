const axios = require('axios'),
  data = require('./data.json'),
  db = require('../db'),
  Barrio = require('../models/almacenes/barrio-model'),
  Almacen = require('../models/almacenes/almacen-model'),
  Distrito = require('../models/almacenes/distrito-model')

const key = 'pFrlVrIGIVCSf6Zs3idAJNVo0aVmoFTU'

const getPoint = async (address) => {
  const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${address.replace(/\s/g,'+')}`
  let aux = {}

  const result = await axios.get(url)
  const point = {
    type: "Point",
    coordinates: [
      result.data.results[0].locations[0].latLng.lng,
      result.data.results[0].locations[0].latLng.lat,
    ]
  }
  aux.geojson = point
  const barrio = await Barrio.findOne({
    geojson: {
      $geoIntersects: {
        $geometry: point
      }
    }
  }) || ""
  aux.barrio = barrio.barrio

  const distrito = await Distrito.findOne({
    geojson: {
      $geoIntersects: {
        $geometry: point
      }
    }
  }) || ""
  aux.distrito = `${distrito.distrito} (${distrito.observacion})`
  return aux
}

data.forEach(async item => {
  const geo = await getPoint(item.address)

  let aux = {
    nombre: item.name,
    direccion: item.address,
    descripcion: item.description,
    ...geo
  }
  if(item.ExtendedData) {
    aux.extras = [{
      nombre: "Alimentar",
      tipo: 'link',
      valor: item.ExtendedData.Data.value
    }]
  }

  Almacen.create(aux)
})
