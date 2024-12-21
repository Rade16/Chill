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
          <label htmlFor="filmCover" className="admin__filmForm-label">
            <input
              type="file"
              id="filmCover"
              accept="image/*"
              className="admin__filmForm-imageInput"
              onChange={handleFilmImageChange}
            />
            <img
              src={previewFilmImage}
              alt=""
              className="admin__filmForm-image"
            />
          </label>
          <input
            type="file"
            accept="video/*"
            className="admin__filmForm-videoInput"
            onChange={(e) => setFilmVideo(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Название"
            onChange={(e) => setFilmName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Описание"
            onChange={(e) => setFilmDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Жанр"
            onChange={(e) => setFilmGenre(e.target.value)}
          />
          <input
            type="date"
            placeholder="Дата выхода"
            onChange={(e) => setFilmReleaseDate(e.target.value)}
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
