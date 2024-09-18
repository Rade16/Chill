const Router = require("express");
const router = new Router();

const seasonController = require("../controllers/seasonController");

router.get("/", seasonController.getAll);
router.post("/", seasonController.create);

module.exports = router;
