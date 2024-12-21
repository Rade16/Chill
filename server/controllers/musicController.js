const { Music } = require("../models/Music");

class MusicController {
  async createMusic(req, res) {
    try {
      const { name, genre, releaseDate, description, artist } = req.body;
      const image = req.files.image[0]
        ? `/musicImage/${req.files.image[0].filename}`
        : null;
      const link = req.files.link[0]
        ? `/music/${req.files.link[0].filename}`
        : null;
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
