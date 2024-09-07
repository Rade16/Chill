import React from "react";
import "./Cinema.scss";
import play from "../../assets/cinema/play.svg";
import promo from "../../assets/cinema/promo.jpg";
import FilmPreview from "../../components/FilmPreview/FilmPreview";
import { filmList } from "../../helper/filmList";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";

const Cinema = () => {
  return (
    <div className="cinema">
      <CinemaNav />
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
          {filmList.map((obj) => {
            return (
              <FilmPreview img={obj.img} name={obj.name} link={obj.link} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cinema;
