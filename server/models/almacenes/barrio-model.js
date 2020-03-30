const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    {polygonSchema} = require('./geo-models')

const Barrio = new Schema({
  mslink: {
    type: Number,
  },
  barrio: {
    type: String,
    required: true,
    unique: true
  },
  geojson: polygonSchema
})

Barrio.index({ 'geojson': '2dsphere' });

module.exports = mongoose.model('barrio', Barrio)