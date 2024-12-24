import React, { useState } from "react";
import "./Cinema.scss";
import CinemaNav from "./../../components/CinemaNav/CinemaNav";
import { Outlet } from "react-router-dom";


const Cinema = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="cinema">
      <CinemaNav onSearch={setSearchQuery} />
      <Outlet context={{ searchQuery }} />
    </div>
  );
};

export default Cinema;
