const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/authMiddleware");
const { usersUploader } = require("../middleware/multer");
const authController = require("../controllers/authController");
router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/auth", authMiddleware, authController.auth);
router.get("/getUsers", authController.getUsers);
router.put(
  "/updateUser/:id",
  usersUploader.single("avatar"),
  authController.updateUser
);
router.put("/updatePassword/:id", authController.updatePassword);

module.exports = router;
