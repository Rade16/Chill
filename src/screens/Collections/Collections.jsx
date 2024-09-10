import React from "react";
import "./Collections.scss";
import add from "./../../assets/music/add.svg";
const Collections = () => {
  return (
    <div className="collections">
      <div className="collections__container">
        <h1 className="collections__title">Коллекции</h1>
        <div className="collections__add">
          <img src={add} alt="" />
        </div>
      </div>
    </div>
  );  
};

export default Collections;
