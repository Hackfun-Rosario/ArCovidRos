const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {pointSchema} = require('./geo-models'),
    {ExtraData} = require('./extradata-model')

const Almacen = new Schema({
  nombre: {
    type: String,
    required: true,
    index: true
  },
  direccion: {
    type: String,
    required: true,
    index: true
  },
  descripcion: {
    type: String,
    index: false
  },
  tipo_comercio: {
    type: String,
    index: false
  },
  telefono: {
    type: [String],
    index: false
  },
  whatsapp: {
    type: [String],
    index: false
  },
  barrio: {
    type: String,
    index: true
  },
  distrito: {
    type: String,
    index: true
  },
  geojson: {
    type: pointSchema
  },
  extras: {
    type: [ExtraData]
  }
},{
  timestamps: true
})

Almacen.index({ 'geojson': '2dsphere' });

module.exports = mongoose.model('almacen', Almacen)