const CovidStats = require('../../models/covid/stats-model'),
  responses = require('../../responses')

const limit = 25; // page elements
const avoidables = {
    _id: 0,
    __v: 0,
    userId: 0,
    createdAt: 0,
    updatedAt: 0
  }; // data we don't render


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

    })
  
  return res.status(201).json(responses.responseData(stat))
}

const getAllStats = async (req, res) => {
  // normalize page value
  let page = Math.abs(req.params.page) || 0

  CovidStats.find({}, avoidables)
    .sort({fecha: -1})
    .skip(((page)*limit))
    .limit(limit)
    .exec( (err, stats) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stats))
    }
  )
}

const getStatByFecha = async (req, res) => {
  // normalize page value
  let page = Math.abs(req.params.page) || 0

  CovidStats.find({fecha: req.params.fecha}, avoidables)
    .sort({fecha: -1})
    .skip(((page)*limit))
    .limit(limit)
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stat))
    }
  )
}

const getStatByProvincia = async (req, res) => {
  // normalize page value
  let page = Math.abs(req.params.page) || 0

  CovidStats.find({provincia: req.params.provincia}, avoidables)
    .sort({fecha: -1})
    .skip(((page)*limit))
    .limit(limit)
    .exec((err, stat) => {
      if(err) {
        return res.status(400).json(responses.responseError(err))
      }
      return res.status(200).json(responses.responseData(stat))
    }
  )
}


const getTotals = async (req, res) => {
  // levantamos la sumatoria de todos los casos hasta la fecha
  let date = await CovidStats.findOne().sort({ fecha: -1 })

  let _match = { $match: { "provincia": { $ne: null } }}
  let _group = { $group: {
                 _id: date ? date.fecha : null,
                 confirmados: { $sum: "$confirmados" },
                 muertes: { $sum: "$muertes"},
                 recuperados: { $sum: "$recuperados" },
                 tests: { $sum: "$tests" },
                 tests_negativos: { $sum: "$tests_negativos" }
               }}

  CovidStats.aggregate([_match, _group])
    .then((stat) => res.status(200).json(responses.responseData(stat)) )
    .catch((err) => res.status(400).json(responses.responseError(err)) )
}

const getTotalByProvincia = async (req, res) => {
  // sumatoria de casos de la provincia indicada hasta la fecha
  let _match = { $match: { "provincia": req.params.provincia }}
  let _group = { $group: {
                 _id: "$provincia",
                 confirmados: { $sum: "$confirmados" },
                 muertes: { $sum: "$muertes"},
                 recuperados: { $sum: "$recuperados" },
                 tests: { $sum: "$tests" },
                 tests_negativos: { $sum: "$tests_negativos" }
               }}

  CovidStats.aggregate([_match, _group])
    .then((stat) => res.status(200).json(responses.responseData(stat)) )
    .catch((err) => res.status(400).json(responses.responseError(err)) )
}

const getTotalByFechas = async (req, res) => {
  // sumatoria de casos en un rango de fechas
  let _match = { $match: { $expr: {} }}

  if (req.params.desde) {
    _match['$match']['$expr'] = { $and: [
      { $gte: ['$fecha', new Date(req.params.desde)] },
      { $lte: ['$fecha', new Date(req.params.hasta)] }
    ]}
  } else {
    _match['$match']['$expr'] = { $lte: ['$fecha', new Date(req.params.hasta)] }
  }

  let _group = {
    $group: {
     _id: "$fecha",
     confirmados: { $sum: "$confirmados" },
     muertes: { $sum: "$muertes"},
     recuperados: { $sum: "$recuperados" },
     tests: { $sum: "$tests" },
     tests_negativos: { $sum: "$tests_negativos" }
   }}

  CovidStats.aggregate([_match, _group])
    .then((stat) => res.status(200).json(responses.responseData(stat)) )
    .catch((err) => res.status(400).json(responses.responseError(err)) )
}


module.exports = {
  createStat,
  getAllStats,
  getStatByFecha,
  getStatByProvincia,
  getTotals,
  getTotalByProvincia,
  getTotalByFechas
}