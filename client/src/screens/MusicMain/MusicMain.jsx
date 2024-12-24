import React, { useState, useEffect } from "react";
import "./MusicMain.scss";
import TrackPreview from "../../components/TrackPreview/TrackPreview";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const MusicMain = () => {
  const { playTrack } = useOutletContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const [allMusic, setAllMusic] = useState([]);
  const [currentTrack, setCurrentTrack] = useState("");

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.load(); // Перезагрузить аудио
      audioRef.current.play(); // Воспроизведение
    }
  }, [currentTrack]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/music/getAll"
        );
        setAllMusic(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMusic();
  }, []);
  return (
    <div className="musicMain">
      <div className="musicMain__container">
        {/* <h1 className="musicMain__drops-title">Свежие дропы</h1>
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
        </div> */}
        <h1 className="musicMain__tracks-title">Все треки</h1>
        <div className="musicMain__tracks">
          {allMusic.map((obj) => {
            return (
              <TrackPreview
                img={obj.image}
                name={obj.name}
                artist={obj.artist}
                link={obj.link}
                onClick={() => playTrack(obj)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicMain;
