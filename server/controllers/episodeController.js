const { Episode } = require("../models/Episode");
const { Season } = require("../models/Season");
const { Series } = require("../models/Series");
class EpisodesController {
  async getAll(req, res) {
    const episodes = await Episode.findAll();
    return res.json(episodes);
  }

  async getOne(req, res) {
    const episode = await Episode.findOne({
      where: { id: req.params.id },
      include: { model: Season, as: "season" },
    });

    if (episode) {
      return res.json(episode);
    } else {
      return res.status(404).json({ message: "Episode not found" });
    }
  }

  async getEpisodesBySeason(req, res) {
    const { seasonId } = req.params;
    const episodes = await Episode.findAll({
      where: { seasonId: seasonId },
    });
    return res.json(episodes);
  }

  async create(req, res) {
    const {
      name,
      episodeNumber,
      description,
      releaseDate,
      seasonId,
      image,
      link,
    } = req.body;
    const episode = await Episode.create({
      name,
      episodeNumber,
      description,
      releaseDate,
      seasonId,
      image,
      link,
    });
    return res.status(201).json(episode);
  }
}

module.exports = new EpisodesController();
