const Stats = require('../models/stats-model')

createStat = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Es necesario cargar los datos para guardar.'
    })
  }

  const stat = new Stats(body)

  if(!stat) {
    return res.status(400).json({
      success: false,
      error: 'Error al crear la estadística en la base'
    })
  }

  stat.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: stat
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        error: err
      })
    })
}

module.exports = {
  createStat
}