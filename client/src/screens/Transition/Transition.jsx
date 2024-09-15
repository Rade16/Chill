import React from "react";
import "./Transition.scss";
import film from "../../assets/transition/film.svg";
import music from "../../assets/transition/music.svg";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
const Transition = () => {
  return (
    <div className="transition">
      <img src={logo} alt="" className="transition__logo" />
      <div className="transition__container">
        <div className="transition__links">
          <Link to="/cinema">
            <div className="transition__links-link">
              <img src={film} alt="" />
            </div>
          </Link>
          <Link to="/music">
            <div className="transition__links-link">
              <img src={music} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Transition;
