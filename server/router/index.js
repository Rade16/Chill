const Router = require("express");
const router = new Router();

const filmsRouter = require("./filmsRouter");
const episodeRouter = require("./episodeRouter");
const seriesRouter = require("./seriesRouter");
const seasonRouter = require("./seasonRouter");

const musicRouter = require("./musicRouter");

router.use("/films", filmsRouter);
router.use("/series", seriesRouter);
router.use("/series/:seriesId/season", seasonRouter);
router.use("/series/:seriesId/season/:seasonId/episode", episodeRouter);
router.use("/music", musicRouter);

module.exports = router;
