import React, { useEffect, useState } from "react";
import "./Series.scss";
import play from "../../assets/cinema/play.svg";
import promo from "../../assets/series/theBoys1.mp4";
import SeriesPreview from "../../components/SeriesPreview/SeriesPreview";
import axios from "axios";

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/series");
        setSeries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeries();
    const intervalId = setInterval(() => {
      fetchSeries();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
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
          {series.map((obj) => {
            return (
              <SeriesPreview
                key={obj.id}
                img={obj.image}
                name={obj.name}
                link={obj.id}
                seasonNumber={obj.seasonNumber}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Series;
