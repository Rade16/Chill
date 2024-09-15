import React from "react";
import "./Music.scss";
import MusicNav from "../../components/MusicNav/MusicNav";
import { Outlet } from "react-router-dom";
const Music = () => {
  return (
    <div className="music">
      <MusicNav />
      <Outlet />
    </div>
  );
};

export default Music;
