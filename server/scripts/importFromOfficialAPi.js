const fs = require("fs");
const _ = require("lodash");
const statsModel = require("../models/covid/stats-model");

const convertToSchemaData = (apiData) => {
  const parsedData = _(apiData)
    .map(({ total_infections, total_deaths, new_cases, new_deaths }, date) => ({
      date,
      Accumulated: {
        cases: total_infections,
        deaths: total_deaths,
      },
      New: {
        cases: new_cases,
        deaths: new_deaths,
      },
    }))
    .value();

  return parsedData;
};

const insertIntoDB = async (stats) => {
  return statsModel.findOneAndUpdate(
    {
      date: stats.date,
    },
    stats,
    { upsert: true },
    (err) => {
      if (err) {
        return console.log(">>>> ERRRR", err);
      }
    }
  );
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const importDataFromJSON = async (oldAPIData) => {
  const parsedData = convertToSchemaData(oldAPIData);
  const dbResults = await Promise.all(
    parsedData.map(async (stats) => {
      const result = await insertIntoDB(stats); // TODO: InsertMany()
      return result;
    })
  );

  return dbResults;
};

const importInBackground = async () => {
  const apiData = JSON.parse(
    fs.readFileSync("scripts/apiDataAll.json").toString("UTF-8")
  );

  const dbResults = await importDataFromJSON(apiData);

  fs.writeFileSync("scripts/insertedResult.json", JSON.stringify(dbResults));
  console.log("Done");
};

module.exports = importInBackground;
