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
  const filmFormData = new FormData();
  filmFormData.append("image", filmImage);
  filmFormData.append("link", filmVideo);
  filmFormData.append("name", filmName);
  filmFormData.append("description", filmDescription);
  filmFormData.append("genre", filmGenere);
  filmFormData.append("releaseDate", filmReleaseDate);

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

  const handleFilmImageChange = (e) => {
    setFilmImage(e.target.files[0]);
    const file = e.target.files[0];
    setPreviewFilmImage(URL.createObjectURL(file));
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
      </div>
    </div>
  );
};

export default Admin;
