const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Season } = require("./Season");
const Episode = sequelize.define("episode", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  episodeNumber: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  releaseDate: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  seasonId: {
    type: DataTypes.INTEGER,
    references: {
      model: "seasons",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Season.hasMany(Episode, { foreignKey: "seasonId" });
Episode.belongsTo(Season, { foreignKey: "seasonId" });

module.exports = { Episode };
