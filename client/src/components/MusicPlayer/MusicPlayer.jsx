import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.scss";
import playIcon from "../../assets/music/play.svg";
import pauseIcon from "../../assets/music/pouse.svg";
import volumeIcon from "../../assets/music/volume.svg";

const MusicPlayer = ({ trackUrl, trackName, trackArtist, trackImg }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const audioRef = useRef();
  const [volume, setVolume] = useState(0.5); // Значение по умолчанию — 50%

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    setSeekValue((audioRef.current.currentTime / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeekChange = (event) => {
    const value = event.target.value;
    setSeekValue(value);
    audioRef.current.currentTime = (value / 100) * duration;
  };

  useEffect(() => {
    if (trackUrl) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [trackUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="musicPlayer">
      <audio
        ref={audioRef}
        src={trackUrl}
        onTimeUpdate={updateCurrentTime}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="musicPlayer__controls">
        <input
          type="range"
          min="0"
          max="100"
          value={seekValue}
          onChange={handleSeekChange}
          className="musicPlayer__controls-range"
        />
        <span className="musicPlayer__controls-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div className="musicPlayer__controls-info">
          <img
            src={trackImg}
            alt=""
            className="musicPlayer__controls-info-img"
          />
          <div className="musicPlayer__controls-info-artist">
            <p className="musicPlayer__controls-info-track">
              {trackName || "No Track Selected"}
            </p>
            <p className="musicPlayer__controls-info-name">
              {trackArtist || "Unknown Artist"}
            </p>
          </div>
          <button onClick={togglePlayPause}>
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt="Play/Pause"
              className="musicPlayer__controls-info-button"
            />
          </button>
          <div className="musicPlayer__controls-info-volume">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="musicPlayer__controls-info-volume-range"
            />
            <img src={volumeIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
