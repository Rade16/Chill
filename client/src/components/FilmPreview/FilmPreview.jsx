import React from "react";
import "./FilmPreview.scss";
import { Link } from "react-router-dom";
const FilmPreview = (obj) => {
  return (
    <Link to={`/cinema/films/${obj.link}`}>
      <div className="filmPreview">
        <img src={obj.img} alt="" className="filmPreview__img" />
        <p className="filmPreview__name">{obj.name}</p>
      </div>
    </Link>
  );
};

export default FilmPreview;
