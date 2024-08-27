import React, { useState, useEffect } from 'react';
import { searchSongs } from '../../services/songService';
import SongItem from '../SongItem/SongItem';
import styles from './SongList.module.scss';

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSongs = async () => {
      if (!query) return;

      setLoading(true);
      setError('');

      try {
        const songData = await searchSongs(query);
        console.log('Fetched Songs:', songData);
        setSongs(songData.songs || []);
      } catch (error) {
        console.error('Error loading songs:', error);
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.songList}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder=""
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
    </div>
  );
};

export default SongList;
