import React from "react";
import "./TrackPreview.scss";
const TrackPreview = (obj) => {
  return (
    <div className="trackPreview">
      <img src={obj.img} alt="" className="trackPreview__img" />
      <p className="trackPreview__name">{obj.name}</p>
      <p className="trackPreview__artist">{obj.artist}</p>
    </div>
  );
};

export default TrackPreview;
