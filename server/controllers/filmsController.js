const { Film } = require("../models/Films");

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
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    const { name, genre, releaseDate, description } = req.body;
    const image = req.files.image[0]
      ? `/covers/${req.files.image[0].filename}`
      : null;
    const link = req.files.link[0]
      ? `/films/${req.files.link[0].filename}`
      : null;
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
