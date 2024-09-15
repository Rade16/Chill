const Router = require("express");
const router = new Router();

const filmsRouter = require("./filmsRouter");

router.use("/films", filmsRouter);

module.exports = router;
