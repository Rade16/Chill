import React, { useState, useEffect } from "react";
import "./SeriesPage.scss";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";
import { useParams } from "react-router-dom"; // Для получения параметра из URL
import axios from "axios";
import EpisodePreview from "../../components/EpisodePreview/EpisodePreview";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
export const seriesPage = () => {
  const { seriesId, seasonId, episodeId } = useParams();
  const [series, setSeries] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [episode, setEpisode] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const responseSeries = await axios.get(
          `http://localhost:3000/api/series/${seriesId}`
        );
        const responseSeason = await axios.get(
          `http://localhost:3000/api/series/${seriesId}/seasons`
        );

        if (selectedSeasonId) {
          const responseEpisodes = await axios.get(
            `http://localhost:3000/api/series/${seriesId}/season/${selectedSeasonId}/episodes`
          );
          setEpisodes(responseEpisodes.data);
        }

        const responseEpisode = await axios.get(
          `http://localhost:3000/api/series/${seriesId}/season/${seasonId}/episode/${episodeId}`
        );
        setSeasons(responseSeason.data);
        setEpisode(responseEpisode.data);
        setSeries(responseSeries.data);
      } catch (error) {
        console.error("Ошибка при получении данных сериала:", error);
      }
    };

    fetchSeries();
  }, [seriesId, selectedSeasonId, episodeId]);
  const handleSeasonClick = async (seasonId) => {
    setSelectedSeasonId(seasonId);
    try {
      const responseEpisodes = await axios.get(
        `http://localhost:3000/api/series/${seriesId}/season/${seasonId}/episodes`
      );
      setEpisodes(responseEpisodes.data);
    } catch (error) {
      console.error("Ошибка при получении серий сезона:", error);
    }
  };

  return (
    <div className="seriesPage">
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

        <div className="seriesPage__seasons">
          <div className="seriesPage__seasons-line">
            {seasons.map((obj) => {
              const isActive = obj.id === selectedSeasonId;
              return (
                <h1
                  className={`seriesPage__seasons-name ${
                    isActive ? "active" : ""
                  }`}
                  key={obj.id}
                  onClick={() => handleSeasonClick(obj.id)}
                >
                  {obj.name}
                </h1>
              );
            })}
          </div>
        </div>
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
