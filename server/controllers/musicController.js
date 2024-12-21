const { Music } = require("../models/Music");

class MusicController {
  async createMusic(req, res) {
    try {
      const { name, genre, releaseDate, description, link, image, artist } =
        req.body;
      const newMusic = await Music.create({
        name,
        genre,
        releaseDate,
        description,
        link,
        image,
        artist,
      });
      res.status(201).json(newMusic);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating music" });
    }
  }

  async getAllMusic(req, res) {
    try {
      const music = await Music.findAll();
      res.json(music);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting music" });
    }
  }

  async getOneMusic(req, res) {
    try {
      const music = await Music.findOne({ where: { id: req.params.id } });
      res.json(music);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting music" });
    }
  }
}

module.exports = new MusicController();
