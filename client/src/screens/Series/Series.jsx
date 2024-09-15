import React from "react";
import "./Series.scss";
import play from "../../assets/cinema/play.svg";
import promo from "../../assets/series/theBoys1.mp4";
import FilmPreview from "../../components/FilmPreview/FilmPreview";
import { filmList } from "../../helper/filmList";
const Series = () => {
  return (
    <div className="series">
      <div className="series__promo">
        <video
          src={promo}
          alt=""
          autoPlay
          muted
          loop
          className="cinema__promo-video"
        />
        <h1 className="cinema__promo-title">Пацаны</h1>
        <div className="series__promo-button">
          <img src={play} alt="" />
          Начать просмотр
        </div>
      </div>
      <div className="series__container">
        <h1 className="series__title">Все сериалы</h1>
        <div className="series__films">
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

export default Series;
