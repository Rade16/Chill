import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Transition from "../screens/Transition/Transition";
import Cinema from "../screens/Cinema/Cinema";
import FilmPage from "../components/FilmPage/FilmPage";
import Music from "../screens/Music/Music";
const ScreenSwitchboard = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Transition />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/cinema/film" element={<FilmPage />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    </>
  );
};

export default ScreenSwitchboard;
