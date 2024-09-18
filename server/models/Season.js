const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Series } = require("./Series");

const Season = sequelize.define("season", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  seasonNumber: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  releaseDate: { type: DataTypes.STRING, allowNull: true },
  seriesId: {
    type: DataTypes.INTEGER,
    references: {
      model: "series",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Series.hasMany(Season, { foreignKey: "seriesId" });
Season.belongsTo(Series, { foreignKey: "seriesId" });

module.exports = { Season };
