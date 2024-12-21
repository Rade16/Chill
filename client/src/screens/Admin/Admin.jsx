import React, { useState, useEffect } from "react";
import "./Admin.scss";
import axios from "axios";
const Admin = () => {
  const [filmImage, setFilmImage] = useState(null);
  const [filmVideo, setFilmVideo] = useState(null);
  const [filmName, setFilmName] = useState(null);
  const [filmDescription, setFilmDescription] = useState(null);
  const [previewFilmImage, setPreviewFilmImage] = useState(null);
  const [filmGenere, setFilmGenre] = useState(null);
  const [filmReleaseDate, setFilmReleaseDate] = useState(null);
  const [musicImage, setMusicImage] = useState(null);
  const [musicVideo, setMusicVideo] = useState(null);
  const [musicName, setMusicName] = useState(null);
  const [musicDescription, setMusicDescription] = useState(null);
  const [previewMusicImage, setPreviewMusicImage] = useState(null);
  const [musicGenere, setMusicGenre] = useState(null);
  const [musicReleaseDate, setMusicReleaseDate] = useState(null);
  const [musicArtist, setMusicArtist] = useState(null);

  const filmFormData = new FormData();
  filmFormData.append("image", filmImage);
  filmFormData.append("link", filmVideo);
  filmFormData.append("name", filmName);
  filmFormData.append("description", filmDescription);
  filmFormData.append("genre", filmGenere);
  filmFormData.append("releaseDate", filmReleaseDate);

  const musicFormData = new FormData();
  musicFormData.append("image", musicImage);
  musicFormData.append("link", musicVideo);
  musicFormData.append("name", musicName);
  musicFormData.append("description", musicDescription);
  musicFormData.append("genre", musicGenere);
  musicFormData.append("releaseDate", musicReleaseDate);
  musicFormData.append("artist", musicArtist);
  const handleFilmSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/films/create",
        filmFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMusicSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/music/create",
        musicFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilmImageChange = (e) => {
    setFilmImage(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewFilmImage(URL.createObjectURL(file));
  };
  const handleMusicImageChange = (e) => {
    setMusicImage(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewMusicImage(URL.createObjectURL(file));
  };

  // Должен вывести объект файла

  return (
    <div className="admin">
      <div className="admin__container">
        <form action="" className="admin__filmForm" onSubmit={handleFilmSubmit}>
          <div className="admin__filmForm-container">
            <div className="admin__filmForm-imageContainer">
              <label htmlFor="filmCover" className="admin__filmForm-label">
                <input
                  type="file"
                  id="filmCover"
                  accept="image/*"
                  className="admin__filmForm-imageInput"
                  onChange={handleFilmImageChange}
                  required
                />
                <img
                  src={previewFilmImage}
                  alt=""
                  className="admin__filmForm-image"
                />
              </label>
              <label htmlFor="filmVideo">Добавить видео</label>
              <input
                type="file"
                id="filmVideo"
                accept="video/*"
                className="admin__filmForm-videoInput"
                onChange={(e) => setFilmVideo(e.target.files[0])}
                required
              />
            </div>
            <div className="admin__filmForm-inputs">
              <input
                type="text"
                placeholder="Название"
                onChange={(e) => setFilmName(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
              <input
                type="text"
                placeholder="Жанр"
                onChange={(e) => setFilmGenre(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
              <input
                type="date"
                placeholder="Дата выхода"
                onChange={(e) => setFilmReleaseDate(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
              <input
                type="text"
                placeholder="Описание"
                onChange={(e) => setFilmDescription(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
            </div>
          </div>
          <button type="submit" className="admin__filmForm-button">
            Добавить
          </button>
        </form>
        <form
          action=""
          className="admin__musicForm"
          onSubmit={handleMusicSubmit}
        >
          <div className="admin__musicForm-container">
            <div className="admin__musicForm-imageContainer">
              <label htmlFor="musicCover" className="admin__musicForm-label">
                <input
                  type="file"
                  id="musicCover"
                  accept="image/*"
                  className="admin__musicForm-imageInput"
                  onChange={handleMusicImageChange}
                  required
                />
                <img
                  src={previewMusicImage}
                  alt=""
                  className="admin__musicForm-image"
                />
              </label>
              <label htmlFor="musicVideo">Добавить трек</label>
              <input
                type="file"
                id="musicVideo"
                accept="audio/*"
                className="admin__musicForm-audioInput"
                onChange={(e) => setMusicVideo(e.target.files[0])}
                required
              />
            </div>
            <div className="admin__musicForm-inputs">
              <input
                type="text"
                placeholder="Название"
                onChange={(e) => setMusicName(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
              <input
                type="text"
                placeholder="Жанр"
                onChange={(e) => setMusicGenre(e.target.value)}
                className="admin__filmForm-inputs-input"
                required
              />
              <input
                type="date"
                placeholder="Дата выхода"
                onChange={(e) => setMusicReleaseDate(e.target.value)}
                className="admin__musicForm-inputs-input"
                required
              />
              <input
                type="text"
                placeholder="Описание"
                onChange={(e) => setMusicDescription(e.target.value)}
                className="admin__musicForm-inputs-input"
                required
              />
              <input
                type="text"
                placeholder="Артист"
                onChange={(e) => setMusicArtist(e.target.value)}
                className="admin__musicForm-inputs-input"
                required
              />
            </div>
          </div>
          <button type="submit" className="admin__musicForm-button">
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
