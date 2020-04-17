const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
//confirmados_total, confirmados_dif, muertes_total, muertes_dif, recuperados_total, recuperados_dif
const DailyStats = new Schema({
  date: {
    type: Date,
    required: true,
    index: true,
  },
  timestamp: {
    type: Number,
    index: true,
    unique: true,
  },
  byProvincias: [
    {
      provincia: String,
      cases: Number,
    },
  ],
  Accumulated: {
    cases: {
      type: Number,
      index: true, // ?
    },
    deaths: {
      type: Number, // ?
      index: true,
    },
  },
  New: {
    cases: {
      type: Number,
      index: true, // ?
    },
    deaths: {
      type: Number, // ?
      index: true,
    },
  },
});

DailyStats.index({ provincia: 1, fecha: -1 });
module.exports = mongoose.model("dailystats", DailyStats);
