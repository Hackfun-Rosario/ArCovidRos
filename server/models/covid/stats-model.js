const mongoose = require('mongoose'),
    Schema = mongoose.Schema
//confirmados_total, confirmados_dif, muertes_total, muertes_dif, recuperados_total, recuperados_dif
const CovidStats = new Schema(
  {
    fecha: {
      type: Date,
      required: true,
      index: true
    },
    timestamp: {
      type: Number,
      index: true
    },
    provincia: {
      type: String,
      required: true,
      index: true
    },
    ciudad: {
      type: String,
      index: true
    },
    departamento: {
      type: String,
      index: true
    },
    zona: {
      type: String,
      index: true
    },
    tipo_transmision: {
      type: String,
      default: ''
    },
    tests: {
      type: Number,
      default: 0
    },
    tests_negativos: {
      type: Number,
      default: 0
    },
    confirmados: {
      type: Number,
      default: 0
    },
    muertes: {
      type: Number,
      default: 0
    },
    recuperados: {
      type: Number,
      default: 0
    },        
    url: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

CovidStats.index({ provincia: 1, fecha: -1 })
module.exports = mongoose.model('covidstats', CovidStats)