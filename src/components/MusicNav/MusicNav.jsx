import React from "react";
import "./MusicNav.scss";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import { Link } from "react-router-dom";
const MusicNav = () => {
  return (
    <div className="musicNav">
      <div className="musicNav__container">
        <Link to="/">
          <img src={logo} alt="" className="musicNav__logo" />
        </Link>
        <div className="musicNav__search">
          <img src={search} alt="" />
          <input
            type="text"
            placeholder="Поиск"
            className="musicNav__search-input"
          />
        </div>
        <ul className="musicNav__list">
          <li className="musicNav__item">Музыка</li>
          <li className="musicNav__item">Хиты</li>
          <li className="musicNav__item">Релизы</li>
          <li className="musicNav__item">Популярные</li>
        </ul>
      </div>
    </div>
  );
};

export default MusicNav;
