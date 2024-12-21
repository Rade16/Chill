const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../db");

const Film = sequelize.define("film", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  releaseDate: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: new Date().toISOString().slice(0, 10),
  },
  description: { type: DataTypes.TEXT, allowNull: false },
  link: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = { Film };
