// src/components/SongItem/SongItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
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

SongItem.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  spotifyUri: PropTypes.string.isRequired,
};

export default SongItem;