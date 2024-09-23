const Router = require("express");
const router = new Router();

const seasonController = require("../controllers/seasonController");
const episodeController = require("../controllers/episodeController");
// router.get("/", seasonController.getAll);
router.get("/", seasonController.getSeasonsBySeries);
router.post("/", seasonController.create);
router.get("/:seasonId/episodes", episodeController.getEpisodesBySeason);
module.exports = router;
