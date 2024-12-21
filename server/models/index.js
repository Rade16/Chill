const sequelize = require("../db");

const { User } = require("./User");
const { Film } = require("./Films");
const { Series } = require("./Series");
const { Season } = require("./Season");
const { Episode } = require("./Episode");
const { Music } = require("./Music");

module.exports = {
  sequelize,
  User,
  Film,
  Series,
  Season,
  Episode,
  Music,
};
