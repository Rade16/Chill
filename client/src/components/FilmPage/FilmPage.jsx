import React, { useState, useEffect } from "react";
import "./FilmPage.scss";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";
import { useParams } from "react-router-dom"; // Для получения параметра из URL
import axios from "axios";
import ReactPlayer from "react-player";
export const FilmPage = (obj) => {
  const { filmId } = useParams();
  const [film, setFilm] = useState({});

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/films/${filmId}`
        );
        setFilm(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных фильма:", error);
      }
    };

    fetchFilm();
  }, [filmId]);
  return (
    <div className="filmPage">
      <CinemaNav />
      <div className="filmPage__container">
        <div className="filmPage__player">
          <ReactPlayer
            controls={true}
            url={film.link}
            height={"100%"}
            width={"100%"}
            light={<img src="https://example.com/thumbnail.png"></img>}
          />
        </div>

        <h1 className="filmPage__filmName">{film.name}</h1>
        <p className="filmPage__description">{film.description}</p>

        <div className="filmPage__comments">
          <input
            type="text"
            placeholder="Оставить комментарий"
            className="filmPage__comments-input"
          />
          <button className="filmPage__comments-button">Отправить</button>
          <div className="filmPage__comments-list"></div>
        </div>
      </div>
    </div>
  );
};
export default FilmPage;
