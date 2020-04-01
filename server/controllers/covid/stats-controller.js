const CovidStats = require('../../models/covid/stats-model'),
  responses = require('../../responses')

createStat = async (req, res) => {
  const body = req.body
  body.userId = req.user_id._id

  if(!body) {
    return res.status(400).json(responses.faltanDatos)
  }

  body.timestamp = new Date(body.fecha).getTime()

  const stat = await CovidStats.findOneAndUpdate(
    {departamento: body.departamento, provincia:body.provincia, fecha:body.fecha},
    body,
    {upsert: true}, 
    err => {
      if(err) {
        return res.status(400).json(responses.errorAlCargar)
      }
    }
    )
    
    return res.status(201).json(responses.responseData(stat))
}

const getAllStats = async (req, res) => {
  await CovidStats.find()
    .sort({fecha: -1})
    .exec( (err, stats) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stats))
    }
  )
}

const getStatByFecha = async (req, res) => {
  await CovidStats.find({fecha: req.params.fecha})
    .sort({fecha: -1})
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stat))            
    }
  )
}

const getStatByProvincia = async (req, res) => {
  await CovidStats.find({provincia: req.params.provincia})
    .sort({fecha: -1})
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stat))            
    }
  )
}

module.exports = {
  createStat,
  getAllStats,
  getStatByFecha,
  getStatByProvincia
}
