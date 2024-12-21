const Router = require("express");
const router = new Router();

const MusicController = require("../controllers/musicController");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, "public/musicImage"); // Путь для изображений
      } else if (file.fieldname === "link") {
        cb(null, "public/music"); // Путь для фильмов
      } else {
        cb(new Error("Unexpected field")); // Если поле неожиданное
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
}).fields([
  { name: "image", maxCount: 1 },
  { name: "link", maxCount: 1 },
]);

router.get("/getAll", MusicController.getAllMusic);
router.get("/getOne/:id", MusicController.getOneMusic);
router.post("/create", upload, MusicController.createMusic);
module.exports = router;
