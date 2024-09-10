import React from "react";
import logo from "../../assets/logo.svg";
import "./CinemaNav.scss";
import search from "../../assets/search.svg";
import avatar from "../../assets/avatar.svg";
import { NavLink, Link } from "react-router-dom";
const CinemaNav = () => {
  return (
    <div className="cinemaNav">
      <div className="cinemaNav-container">
        <Link to="/">
          <img src={logo} alt="" className="cinemaNav-logo" />
        </Link>
        <nav className="cinemaNav-nav">
          <ul className="cinemaNav-nav-list">
            <NavLink
              to="/cinema/films"
              className={({ isActive }) => {
                return isActive ? "active" : "cinemaNav-nav-item";
              }}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/cinema/series"
              className={({ isActive }) => {
                return isActive ? "active" : "cinemaNav-nav-item";
              }}
            >
              Сериалы
            </NavLink>
          </ul>
          <div className="cinemaNav-nav-search">
            <img src={search} alt="" />
            <input
              type="text"
              placeholder="Поиск"
              className="cinemaNav-nav-search-input"
            />
          </div>
        </nav>
        <div className="cinemaNav-user">
          <img src={avatar} alt="" className="cinemaNav-user-avatar" />
        </div>
      </div>
    </div>
  );
};

export default CinemaNav;
