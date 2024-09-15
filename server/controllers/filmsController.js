const { Film } = require("../models/models");

class FilmsController {
  async getAll(req, res) {
    const films = await Film.findAll();
    return res.json(films);
  }

  async getOne(req, res) {
    const film = await Film.findOne({ where: { id: req.params.id } });
    return res.json(film);
  }

  async create(req, res) {
    const { name, genre, releaseDate, description, link, image } = req.body;
    const film = await Film.create({
      name,
      genre,
      releaseDate,
      description,
      link,
      image,
    });
    return res.json(film);
  }
}

module.exports = new FilmsController();
