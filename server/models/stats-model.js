const mongoose = require('mongoose'),
    Schema = mongoose.Schema

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
    confirmados: {
      type: Number,
      required: true
    },
    muertes: {
      type: Number,
      required: true
    },
    url: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

CovidStats.index({ provincia: 1, fecha: -1 })
module.exports = mongoose.model('covidstats', CovidStats)