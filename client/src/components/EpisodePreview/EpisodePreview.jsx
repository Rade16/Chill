import React from "react";
import "./EpisodePreview.scss";
import { Link } from "react-router-dom";
const EpisodePreview = (obj) => {
  return (
    <Link to={`/cinema/series/${obj.seriesId}/episode/${obj.link}`}>
      <div className="episodePreview">
        <img src={obj.img} alt="" className="episodePreview__img" />
        <p className="episodePreview__name">{obj.name}</p>
      </div>
    </Link>
  );
};

export default EpisodePreview;
