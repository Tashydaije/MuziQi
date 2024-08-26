// src/components/SongItem/SongItem.jsx
import React from 'react';
import styles from './SongItem.module.scss';

const SongItem = ({ title, artist, album, duration, spotifyUri }) => {
  return (
    <div className={styles.songItem}>
      <h3>{title}</h3>
      <p>{artist}</p>
      <p>{album}</p>
      <p>{duration}</p>
      <a href={spotifyUri} target="_blank" rel="noopener noreferrer">Listen</a>
    </div>
  );
};

export default SongItem;
