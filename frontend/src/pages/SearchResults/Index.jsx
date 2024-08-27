import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchSongs } from '../../services/songService';

const SearchResults = () => {
  const location = useLocation();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (!query) return;

    const loadSongs = async () => {
      setLoading(true);
      setError('');
      try {
        const songData = await searchSongs(query);
        setSongs(songData.songs || []);
      } catch (error) {
        setError('Failed to fetch songs');
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [location.search]);

  return (
    <div>
      <h1>Search Results</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {songs.map((song) => (
          <li key={song.id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
