require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const PORT = process.env.PORT || 6000;
const router = require("./router/index");
const path = require("path");

const app = express();
app.use("/covers", express.static(path.join(__dirname, "public", "covers")));
app.use("/films", express.static(path.join(__dirname, "public", "films")));
app.use("/music", express.static(path.join(__dirname, "public", "music")));
app.use(
  "/musicImage",
  express.static(path.join(__dirname, "public", "musicImage"))
);
app.use("/users", express.static(path.join(__dirname, "public", "users")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
