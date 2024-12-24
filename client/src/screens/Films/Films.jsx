import React, { useEffect, useState } from "react";
import "./Films.scss";
import play from "../../assets/cinema/play.svg";
import promo from "../../assets/film/malchishnik.mp4";
import FilmPreview from "../../components/FilmPreview/FilmPreview";
import axios from "axios";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
const Films = () => {
  const [films, setFilms] = useState([]);
  const { searchQuery } = useOutletContext();
  const [filteredFilms, setFilteredFilms] = useState([]);

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
    const intervalId = setInterval(() => {
      fetchFilms();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((films) =>
        films.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFilms(filtered);
    }
  }, [searchQuery, films]);
  return (
    <div className="cinema">
      <div className="cinema__promo">
        <video
          src={promo}
          autoPlay
          muted
          loop
          className="cinema__promo-video"
        />
        <h1 className="cinema__promo-title">Мальчишник в Вегасе</h1>
        <Link to={"/cinema/films/1"}>
          <div className="cinema__promo-button">
            <img src={play} alt="" />
            Начать просмотр
          </div>
        </Link>
      </div>
      <div className="cinema__container">
        <h1 className="cinema__title">Все фильмы </h1>
        <div className="cinema__films">
          {filteredFilms.map((obj) => {
            return (
              <FilmPreview
                key={obj.id}
                img={obj.image}
                name={obj.name}
                link={obj.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Films;
