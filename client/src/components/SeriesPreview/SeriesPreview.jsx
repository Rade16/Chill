import React from "react";
import "./SeriesPreview.scss";
import { Link } from "react-router-dom";
const SeriesPreview = (obj) => {
  return (
    <Link to={`/cinema/series/${obj.link}/episode/1`}>
      <div className="seriesPreview">
        <img src={obj.img} alt="" className="seriesPreview__img" />
        <p className="seriesPreview__name">{obj.name}</p>
      </div>
    </Link>
  );
};

export default SeriesPreview;
