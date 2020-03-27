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
    confirmados_total: {
      type: Number,
      default: 0
    },
    confirmados_dif: {
      type: Number,
      default: 0
    },
    muertes_total: {
      type: Number,
      default: 0
    },
    muertes_dif: {
      type: Number,
      default: 0
    },
    recuperados_total: {
      type: Number,
      default: 0
    },
    recuperados_dif: {
      type: Number,
      default: 0
    },        
    url: {
      type: String
    },
    userId: {
      type: String
    },

  },
  {
    timestamps: true
  }
)

CovidStats.index({ provincia: 1, fecha: -1 })
module.exports = mongoose.model('covidstats', CovidStats)