const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {polygonSchema} = require('./geo-models')

const Distrito = new Schema({
  distrito: {
    type: String,
    required: true,
    unique: true
  },
  observacion: {
    type: String,
    required: true,
    unique: true
  },
  geojson: polygonSchema
})

Distrito.index({ 'geojson': '2dsphere' });

module.exports = mongoose.model('distrito', Distrito)