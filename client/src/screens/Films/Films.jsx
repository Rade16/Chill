import React, { useEffect, useState } from "react";
import "./Films.scss";
import play from "../../assets/cinema/play.svg";
import promo from "../../assets/cinema/promo.png";
import FilmPreview from "../../components/FilmPreview/FilmPreview";
import axios from "axios";
const Films = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/films");
        setFilms(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilms();
  }, []);
  return (
    <div className="cinema">
      <div className="cinema__promo">
        <img src={promo} alt="" className="cinema__promo-img" />
        <div className="cinema__promo-button">
          <img src={play} alt="" />
          Начать просмотр
        </div>
      </div>
      <div className="cinema__container">
        <h1 className="cinema__title">Все фильмы</h1>
        <div className="cinema__films">
          {films.map((obj) => {
            return (
              <FilmPreview img={obj.image} name={obj.name} link={obj.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Films;
