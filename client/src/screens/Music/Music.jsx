import React, { useState, useRef } from "react";
import "./Music.scss";
import MusicNav from "../../components/MusicNav/MusicNav";
import { Outlet } from "react-router-dom";
import MusicPlayer from "../../components/MusicPlayer/MusicPlayer";
const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    url: "",
  });
  const audioRef = useRef(null); // Создаём ссылку на аудиоплеер
  const playTrack = (track) => {
    console.log("Selected track:", track); // Для отладки
    setCurrentTrack(track); // Установить текущий трек
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    setIsPlaying(!isPlaying); // Начать воспроизведение
  };
  return (
    <div className="music">
      <MusicNav />
      <div className="music__wrapper">
        <div className="music__container">
          <Outlet context={{ playTrack, currentTrack }} />
        </div>
        <MusicPlayer
          trackUrl={`http://localhost:3000/public${currentTrack.link}`}
          trackName={currentTrack.name}
          trackArtist={currentTrack.artist}
          trackImg={`http://localhost:3000/public${currentTrack.image}`}
        />
      </div>
    </div>
  );
};

export default Music;
