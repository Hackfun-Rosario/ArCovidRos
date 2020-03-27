const CovidStats = require('../models/stats-model')

createStat = async (req, res) => {
  const body = req.body
  body.userId = req.user_id._id

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Es necesario cargar los datos para guardar.'
    })
  }

  body.timestamp = new Date(body.fecha).getTime()
  console.log(body.timestamp)

  const stat = await CovidStats.findOneAndUpdate(
    {provincia:body.provincia, fecha:body.fecha},
    body,
    {upsert: true}, 
    err => {
      if(err) {
        return res.status(400).json({
          success: false,
          error: 'Error al crear la estadística en la base'
        })
      }
    }
    )
    
    return res.status(201).json({
      success: true,
      data: stat
    })
}

const getAllStats = async (req, res) => {
  await CovidStats.find()
    .sort({fecha: -1})
    .exec( (err, stats) => {
      if(err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }
      return res.status(200).json({
        success: true,
        data: stats
      })
    }
  )
}

const getStatByFecha = async (req, res) => {
  await CovidStats.find({fecha: req.params.fecha})
    .sort({fecha: -1})
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }
      return res.status(200).json({
        success: true,
        data: stat
      })            
    }
  )
}

const getStatByProvincia = async (req, res) => {
  await CovidStats.find({provincia: req.params.provincia})
    .sort({fecha: -1})
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json({
          success: false,
          error: err
        })
      }
      return res.status(200).json({
        success: true,
        data: stat
      })            
    }
  )
}

module.exports = {
  createStat,
  getAllStats,
  getStatByFecha,
  getStatByProvincia
}