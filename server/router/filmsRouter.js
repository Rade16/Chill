const Router = require("express");
const router = new Router();

const FilmsController = require("../controllers/filmsController");

router.get("/:id", FilmsController.getOne);
router.get("/", FilmsController.getAll);
router.post("/", FilmsController.create);

module.exports = router;
