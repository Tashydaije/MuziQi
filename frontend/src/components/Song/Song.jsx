import React from 'react';
import { IconButton, Slider } from '@mui/material';
import { PlayArrow, Pause, Shuffle, Repeat, SkipPrevious, SkipNext, VolumeUp } from '@mui/icons-material';
import styles from './Song.module.scss';

const Song = () => {
  return (
    <div className={styles.songContainer}>
      {/* Song Details */}
      <div className={styles.songDetails}>
        <div className={styles.songTitle}>Song Title</div>
        <div className={styles.songArtist}>Artist Name</div>
      </div>

      {/* Controls Container */}
      <div className={styles.controlsContainer}>
        {/* Control Buttons */}
        <div className={styles.controlButtons}>
          <IconButton className={styles.controlButton}><Shuffle /></IconButton>
          <IconButton className={styles.controlButton}><SkipPrevious /></IconButton>
          <IconButton className={styles.controlButton}><PlayArrow /></IconButton>
          <IconButton className={styles.controlButton}><Pause /></IconButton>
          <IconButton className={styles.controlButton}><SkipNext /></IconButton>
          <IconButton className={styles.controlButton}><Repeat /></IconButton>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.songInfo}>
            <span className={styles.currentTime}>0:00</span>
            <Slider className={styles.progressBar} value={50} />
            <span className={styles.duration}>3:45</span>
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className={styles.volumeControl}>
        <IconButton className={styles.volumeIcon}><VolumeUp /></IconButton>
        <Slider className={styles.volumeSlider} value={70} />
      </div>
    </div>
  );
};

export default Song;
