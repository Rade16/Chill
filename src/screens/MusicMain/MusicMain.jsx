import React from "react";
import "./MusicMain.scss";
import { trackList } from "../../helper/trackList";
import TrackPreview from "../../components/TrackPreview/TrackPreview";
import { newTrackList } from "../../helper/newTrackList";
const MusicMain = () => {
  return (
    <di className="musicMain">
      <div className="musicMain__container">
        <h1 className="musicMain__drops-title">Свежие дропы</h1>
        <div className="musicMain__drops">
          <div className="musicMain__drops-line">
            {newTrackList.map((obj) => {
              return (
                <TrackPreview
                  img={obj.img}
                  name={obj.name}
                  artist={obj.artist}
                />
              );
            })}
          </div>
          <div className="musicMain__drops-more">Еще</div>
        </div>
        <h1 className="musicMain__tracks-title">Все треки</h1>
        <div className="musicMain__tracks">
          {trackList.map((obj) => {
            return (
              <TrackPreview img={obj.img} name={obj.name} artist={obj.artist} />
            );
          })}
        </div>
      </div>
    </di>
  );
};

export default MusicMain;
