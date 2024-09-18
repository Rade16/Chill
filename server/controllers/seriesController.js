const { Series } = require("../models/Series");
const { Season } = require("../models/Season");
const { Episode } = require("../models/Episode");
class SeriesController {
  async getAll(req, res) {
    const series = await Series.findAll();
    return res.json(series);
  }

  async getOne(req, res) {
    const series = await Series.findOne({
      where: { id: req.params.id },
      include: { model: Season, as: "seasons" },
    });
    return res.json(series);
  }

  async getAllEpisodesBySeries(req, res) {
    const { seriesId } = req.params;
    // Находим сериал с его сезонами и эпизодами
    const series = await Series.findOne({
      where: { id: seriesId },
      include: {
        model: Season,
        as: "seasons",
        include: {
          model: Episode,
          as: "episodes",
        },
      },
    });
    const allEpisodes = series.seasons.flatMap((season) => season.episodes);
    return res.json(allEpisodes);
  }

  async create(req, res) {
    const { name, genre, releaseDate, description, link, image } = req.body;
    const series = await Series.create({
      name,
      genre,
      releaseDate,
      description,
      link,
      image,
    });
    return res.json(series);
  }
}
module.exports = new SeriesController();
