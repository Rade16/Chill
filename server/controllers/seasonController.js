const { Season } = require("../models/Season");

class SeasonsController {
  async getAll(req, res) {
    const seasons = await Season.findAll();

    return res.json(seasons);
  }

  async getBySeries(req, res) {
    const { seriesId } = req.params;
    const seasons = await Season.findAll({
      where: { seriesId },
    });

    return res.json(seasons);
  }

  async getSeasonsBySeries(req, res) {
    const { seriesId } = req.params;
    const seasons = await Season.findAll({
      where: { seriesId },
    });
    return res.json(seasons);
  }
  async create(req, res) {
    const { name, seasonNumber, description, releaseDate, seriesId } = req.body;
    const season = await Season.create({
      name,
      seasonNumber,
      description,
      releaseDate,
      seriesId,
    });
    return res.json(season);
  }
}

module.exports = new SeasonsController();
