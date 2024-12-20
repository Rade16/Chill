const Router = require("express");
const router = new Router();

const MusicController = require("../controllers/musicController");

router.get("/getAll", MusicController.getAllMusic);
router.get("/getOne/:id", MusicController.getOneMusic);
router.post("/createMusic", MusicController.createMusic);
module.exports = router;
