import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, Shuffle, Repeat, SkipPrevious, SkipNext, VolumeUp } from '@mui/icons-material';
import styles from './Song.module.scss';

const API_URL = process.env.REACT_APP_API_URL;

const Song = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songData, setSongData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/songs`);
        const firstSong = response.data[0];
        setSongData(firstSong);
        console.log("Fetched Song Data:", firstSong); // Debugging: Check fetched data
      } catch (error) {
        console.error('Error fetching song data:', error);
      }
    };

    fetchSongData();
  }, []);

  useEffect(() => {
    if (songData && songData.url) {
      audioRef.current = new Audio(songData.url);
      audioRef.current.volume = volume / 100;

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', () => {
            setCurrentTime(audioRef.current.currentTime);
          });
        }
      };
    }
  }, [songData]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback failed:', error); // Debugging: Handle promise rejection
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  const handleProgressChange = (event, newValue) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  return (
    <div className={styles.songContainer}>
      {/* Song Details */}
      <div className={styles.songDetails}>
        <div className={styles.songTitle}>{songData ? songData.title : 'Loading...'}</div>
        <div className={styles.songArtist}>{songData ? songData.artist : ''}</div>
      </div>

      {/* Controls Container */}
      <div className={styles.controlsContainer}>
        {/* Control Buttons */}
        <div className={styles.controlButtons}>
          <IconButton className={styles.controlButton}><Shuffle /></IconButton>
          <IconButton className={styles.controlButton}><SkipPrevious /></IconButton>
          
          {/* Play/Pause Button */}
          <IconButton className={styles.controlButton} onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          
          <IconButton className={styles.controlButton}><SkipNext /></IconButton>
          <IconButton className={styles.controlButton}><Repeat /></IconButton>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.songInfo}>
            <span className={styles.currentTime}>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
            <Slider 
              className={styles.progressBar} 
              value={currentTime} 
              max={audioRef.current ? audioRef.current.duration : 100} 
              onChange={handleProgressChange}
            />
            <span className={styles.duration}>{audioRef.current ? new Date(audioRef.current.duration * 1000).toISOString().substr(14, 5) : '0:00'}</span>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className={styles.volumeControl}>
        <IconButton className={styles.volumeIcon}><VolumeUp /></IconButton>
        <Slider className={styles.volumeSlider} value={volume} onChange={handleVolumeChange} />
      </div>
    </div>
  );
};

export default Song;
