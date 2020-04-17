const DailyStats = require("../../models/covid/stats-model"),
  responses = require("../../responses");

const avoidables = {
  _id: 0,
  __v: 0,
  userId: 0,
  createdAt: 0,
  updatedAt: 0,
}; // data we don't render

async function getStats(req, res, filter) {
  try {
    let page = req.params.page != undefined ? parseInt(req.params.page) : 0;
    let limit = req.query.limit != undefined ? parseInt(req.query.limit) : 25;
    let fromDate = req.query.fromDate;
    let toDate = req.query.toDate;

    if (page < 0 || isNaN(page)) {
      throw new RangeError(
        "Page has to be a number greater than or equal to zero."
      );
    }
    if (limit < 0 || isNaN(limit)) {
      throw new RangeError(
        "Limit has to be a number greater than or equal to zero."
      );
    }

    if (!filter.date && (fromDate || toDate)) {
      filter.date = {};
      if (fromDate) {
        filter.date.$gte = fromDate;
      }
      if (toDate) {
        filter.date.$lte = toDate;
      }
    }

    query = DailyStats.find(filter, avoidables)
      .sort({ date: 1 })
      .skip(page * limit);

    if (limit > 0) {
      query = query.limit(limit);
    }

    stats = await query.exec();
    res.status(200).json(responses.responseData(stats));
  } catch (err) {
    res.status(400).json(responses.responseError(err.toString()));
  }
}

const createStat = async (req, res) => {
  const body = req.body;
  body.userId = req.user_id._id;

  if (!body) {
    return res.status(400).json(responses.faltanDatos);
  }

  body.timestamp = new Date(body.date).getTime();

  const stat = await DailyStats.findOneAndUpdate(
    {
      byProvincias: body.byProvincias,
      date: body.date,
    },
    body,
    { upsert: true },
    (err) => {
      if (err) {
        return res.status(400).json(responses.errorAlCargar);
      }
    }
  );

  return res.status(201).json(responses.responseData(stat));
};

const getAllStats = (req, res) => {
  getStats(req, res, {});
};

const getStatByDate = (req, res) => {
  getStats(req, res, { date: req.params.date });
};

const getStatByProvincia = (req, res) => {
  // getStats(req, res, { provincia: req.params.provincia });
  // TODO:
  return [];
};

module.exports = {
  createStat,
  getAllStats,
  getStatByDate,
  getStatByProvincia,
};
