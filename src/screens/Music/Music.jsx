import React from "react";
import "./Music.scss";
import MusicNav from "../../components/MusicNav/MusicNav";
import { trackList } from "../../helper/trackList";
import TrackPreview from "../../components/TrackPreview/TrackPreview";
import { newTrackList } from "../../helper/newTrackList";
const Music = () => {
  return (
    <div className="music">
      <MusicNav />
      <div className="music__container">
        <h1 className="music__drops-title">Свежие дропы</h1>
        <div className="music__drops">
          <div className="music__drops-line">
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
          <div className="music__drops-more">Еще</div>
        </div>
        <h1 className="music__tracks-title">Все треки</h1>
        <div className="music__tracks">
          {trackList.map((obj) => {
            return (
              <TrackPreview img={obj.img} name={obj.name} artist={obj.artist} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Music;
