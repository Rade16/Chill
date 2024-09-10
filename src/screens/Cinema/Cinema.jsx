import React from "react";
import "./Cinema.scss";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";
import { Outlet } from "react-router-dom";

const Cinema = () => {
  return (
    <div className="cinema">
      <CinemaNav />
      <Outlet />
    </div>
  );
};

export default Cinema;
