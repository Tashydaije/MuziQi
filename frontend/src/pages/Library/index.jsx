import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import styles from './Library.module.scss';
import { UserPlaylists } from '../../services/playlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylists = await UserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
      toast.error(error.message);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <Layout>
      <div className={styles.libraryContainer}>
        <h2>My Library</h2>
        <ToastContainer />
        {playlists.length === 0 ? (
          <p>No playlists found</p>
        ) : (
          <div className={styles.playlistGrid}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={styles.playlistCard}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <p>{playlist.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Library;