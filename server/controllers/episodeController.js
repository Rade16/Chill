const { Episode } = require("../models/Episode");
const { Season } = require("../models/Season");

class EpisodesController {
  // Получение всех эпизодов
  async getAll(req, res) {
    const episodes = await Episode.findAll();
    return res.json(episodes);
  }

  // Получение конкретного эпизода по ID
  async getOne(req, res) {
    const episode = await Episode.findOne({
      where: { id: req.params.id },
      include: { model: Season, as: "season" }, // Включаем информацию о сезоне
    });
    if (episode) {
      return res.json(episode);
    } else {
      return res.status(404).json({ message: "Episode not found" });
    }
  }

  // Создание нового эпизода
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
