import React, { useEffect, useState } from "react";
import "./SeriesPreview.scss";
import { Link } from "react-router-dom";
import axios from "axios";
const SeriesPreview = (obj) => {
  const [firstSeasonId, setFirstSeasonId] = useState(null);
  const [firstEpisodeId, setFirstEpisodeId] = useState(null);
  useEffect(() => {
    const fetchFirstSeasonAndEpisode = async () => {
      try {
        const seasonsResponse = await axios.get(
          `http://localhost:3000/api/series/${obj.link}/seasons`
        );

        const sortedSeasons = seasonsResponse.data.sort(
          (a, b) => a.seasonNumber - b.seasonNumber
        );

        console.log("SEASON" + sortedSeasons);

        const firstSeason = sortedSeasons[0];
        setFirstSeasonId(firstSeason.id);

        const episodesResponse = await axios.get(
          `http://localhost:3000/api/series/${obj.link}/season/${firstSeason.id}/episodes`
        );

        const sortedEpisodes = episodesResponse.data.sort(
          (a, b) => a.episodeNumber - b.episodeNumber
        );
        const firstEpisode = sortedEpisodes[0];
        console.log(sortedEpisodes);
        setFirstEpisodeId(firstEpisode.id);
      } catch (error) {
        console.error("Ошибка при получении сезона или серии:", error);
      }
    };
    fetchFirstSeasonAndEpisode();
  }, [obj.link]);

  if (!firstSeasonId || !firstEpisodeId) {
    return <p>Ошибка загрузки данных или данные отсутствуют</p>;
  }
  return (
    <Link
      to={`/cinema/series/${obj.link}/season/${firstSeasonId}/episode/${firstEpisodeId}`}
    >
      <div className="seriesPreview">
        <img src={obj.img} alt="" className="seriesPreview__img" />
        <p className="seriesPreview__name">{obj.name}</p>
      </div>
    </Link>
  );
};

export default SeriesPreview;
