const Router = require("express");
const router = new Router();
const { coversUploader } = require("../middleware/multer");
const { filmsUploader } = require("../middleware/multer");
const FilmsController = require("../controllers/filmsController");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, "public/covers"); // Путь для изображений
      } else if (file.fieldname === "link") {
        cb(null, "public/films"); // Путь для фильмов
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

router.get("/:id", FilmsController.getOne);
router.get("/", FilmsController.getAll);
router.post(
  "/create",
  upload,
  // coversUploader.single("image"),
  // filmsUploader.single("link"),
  FilmsController.create
);

module.exports = router;
