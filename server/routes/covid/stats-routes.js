const express = require("express"),
  StatsController = require("../../controllers/covid/stats-controller"),
  AuthMiddleware = require("../../middlewares/is-authenticated");
router = express.Router();

router.post(
  "/stats",
  AuthMiddleware.isAuthenticatedMiddleware,
  StatsController.createStat
);
router.get("/stats/:page?", StatsController.getAllStats);
router.get("/getStatByFecha/:fecha/:page?", StatsController.getStatByDate);
router.get(
  "/getStatByProvincia/:provincia/:page?",
  StatsController.getStatByProvincia
);

/**
 * Dont use this route in productions, it's only for development
 */
router.post("/import-data", StatsController.importDataFromJSONCon);

module.exports = router;
