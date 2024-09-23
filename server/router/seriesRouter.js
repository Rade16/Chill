const Router = require("express");
const router = new Router();

const SeriesController = require("../controllers/seriesController");
const SeasonController = require("../controllers/seasonController");

router.get("/", SeriesController.getAll);
router.post("/", SeriesController.create);
router.get("/:seriesId", SeriesController.getAllEpisodesBySeries);
router.get("/:seriesId/seasons", SeasonController.getSeasonsBySeries);

module.exports = router;
