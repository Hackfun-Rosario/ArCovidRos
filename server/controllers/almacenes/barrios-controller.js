const Barrio = require('../../models/almacenes/barrio-model'),
  responses = require('../../responses')

const createBarrio = async (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json(responses.faltanDatos)
  }

  const barrio = await Barrio.findOneAndUpdate(
    {barrio: body.barrio},
    body,
    {upsert: true},
    (err) => {
      if(err) {
        console.log(err)
        return res.status(400).json(responses.errorAlCargar)
      }
    }
  )

  return res.status(201).json(responses.responseData(barrio))
}

const getAllBarrios = async (req, res) => {
  const barrios = await Barrio.find()

  return res.status(201).json(responses.responseData(barrios))  
}

module.exports = {
  createBarrio,
  getAllBarrios
}