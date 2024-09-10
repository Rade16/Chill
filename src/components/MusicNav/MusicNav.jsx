import React from "react";
import "./MusicNav.scss";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink
            to="/music/main"
            className={({ isActive }) =>
              isActive ? "active" : "musicNav__item"
            }
          >
            Главная
          </NavLink>
          <NavLink
            to="/music/collections"
            className={({ isActive }) =>
              isActive ? "active" : "musicNav__item"
            }
          >
            Коллекции
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default MusicNav;
