const mongoose = require('mongoose')

const ExtraData = new mongoose.Schema({
  nombre: {
    type: String
  },
  tipo: {
    type: String
  },
  valor: {
    type: String
  }
})

module.exports = {
  ExtraData
}
