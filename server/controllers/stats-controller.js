const CovidStats = require('../models/stats-model')

createStat = async (req, res) => {
  const body = req.body
  console.log(req.user_id);

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Es necesario cargar los datos para guardar.'
    })
  }

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
  await CovidStats.find(
    {},
    (err, stats) => {
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
  await CovidStats.find(
    {fecha: req.params.fecha},
    (err, stat) => {
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
  await CovidStats.find(
    {provincia: req.params.provincia},
    (err, stat) => {
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