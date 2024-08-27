// src/components/SongList/SongList.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllSongs } from '../../services/songService';
import SongItem from '../SongItem/SongItem';
import styles from './SongList.module.scss';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const songData = await fetchAllSongs();
        setSongs(songData);
      } catch (error) {
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.songList}>
      {songs.length > 0 ? (
        songs.map((song) => (
          <SongItem
            key={song.spotifyUri}
            title={song.title}
            artist={song.artist}
            album={song.album}
            duration={song.duration}
            spotifyUri={song.spotifyUri}
          />
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
};

export default SongList;
