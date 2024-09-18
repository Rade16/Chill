import React, { useState, useEffect } from "react";
import "./SeriesPage.scss";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";
import { useParams } from "react-router-dom"; // Для получения параметра из URL
import axios from "axios";
import EpisodePreview from "../../components/EpisodePreview/EpisodePreview";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
export const seriesPage = () => {
  const { seriesId, episodeId } = useParams();
  const [series, setSeries] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState({});
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const responseSeries = await axios.get(
          `http://localhost:3000/api/series/${seriesId}`
        );
        const responseEpisodes = await axios.get(
          `http://localhost:3000/api/series/${seriesId}/episode`
        );
        const responseEpisode = await axios.get(
          `http://localhost:3000/api/series/${seriesId}/episode/${episodeId}`
        );

        setEpisodes(responseEpisodes.data);
        setEpisode(responseEpisode.data);
        setSeries(responseSeries.data);
      } catch (error) {
        console.error("Ошибка при получении данных сериала:", error);
      }
    };

    fetchSeries();
  }, [seriesId, episodeId]);

  return (
    <div className="seriesPage">
      <CinemaNav />
      <div className="seriesPage__container">
        <div className="seriesPage__player">
          <ReactPlayer
            controls={true}
            url={series.link}
            height={"100%"}
            width={"100%"}
            light={<img src="https://example.com/thumbnail.png"></img>}
          />
        </div>

        <h1 className="seriesPage__seriesName">{episode.name}</h1>
        <p className="seriesPage__description">{episode.description}</p>

        <p className="seriesPage__episodes-title">Серии</p>
        <div className="seriesPage__episodes-line">
          {episodes.map((obj) => {
            return (
              <EpisodePreview
                key={obj.id}
                img={obj.image}
                name={obj.name}
                link={obj.id}
                seriesId={seriesId}
              />
            );
          })}
        </div>
        <div className="seriesPage__comments">
          <input
            type="text"
            placeholder="Оставить комментарий"
            className="seriesPage__comments-input"
          />
          <button className="seriesPage__comments-button">Отправить</button>
          <div className="seriesPage__comments-list"></div>
        </div>
      </div>
    </div>
  );
};
export default seriesPage;
