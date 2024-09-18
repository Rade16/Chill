const Router = require("express");
const router = new Router();

const SeriesController = require("../controllers/seriesController");

router.get("/:id", SeriesController.getOne);
router.get("/", SeriesController.getAll);
router.post("/", SeriesController.create);
router.get("/:seriesId/episode", SeriesController.getAllEpisodesBySeries);

module.exports = router;
