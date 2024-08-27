// src/pages/SearchResults/index.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchSongs } from '../../services/songService';
import SongItem from '../../components/SongItem/SongItem';
import styles from './SearchResults.module.scss';
import Layout from '../../components/Layout';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setLoading(true);
        // setError('');
        try {
          const data = await searchSongs(query);
          // console.log('Search results:', data);
          setResults(data);
        } catch (err) {
          console.error('Search error:', err);
          setError('Failed to search for songs, please login and try again');
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1>Search Results for: {query}</h1>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        <div className="grid grid-cols-3 gap-5 py-10  mx-auto">
          {results.length ? (
            results.map((song) => (
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
            <p>No results found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};


export default SearchResults;