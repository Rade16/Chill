const Router = require("express");
const router = new Router();

const EpisodesController = require("../controllers/episodeController");

router.get("/:id", EpisodesController.getOne);
router.get("/", EpisodesController.getAll);
router.post("/", EpisodesController.create);

module.exports = router;
