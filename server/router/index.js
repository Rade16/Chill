const Router = require("express");
const router = new Router();

const filmsRouter = require("./filmsRouter");
const episodeRouter = require("./episodeRouter");
const seriesRouter = require("./seriesRouter");
const seasonRouter = require("./seasonRouter");

router.use("/films", filmsRouter);
router.use("/series", seriesRouter);
router.use("/series/:seriesId/season", seasonRouter);
router.use("/series/:seriesId/season/:seasonId/episode", episodeRouter);

module.exports = router;
