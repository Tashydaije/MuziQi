import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import styles from './Playlist.module.scss';
import { getPlaylistDetails } from '../../services/playlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const playlistDetails = await getPlaylistDetails(playlistId);
        setPlaylist(playlistDetails);
      } catch (error) {
        toast.error('Failed to fetch playlist details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.playlistContainer}>
        {playlist ? (
          <>
            <div className={styles.playlistHeader}>
              <img
                src={playlist.image || '/path/to/default/image.png'}
                alt={playlist.name}
                className={styles.playlistImage}
              />
              <h1>{playlist.name}</h1>
            </div>

            <div className={styles.songsContainer}>
              <h2>Songs</h2>
              {playlist.songs && playlist.songs.length === 0 ? (
                <p>No songs in this playlist</p>
              ) : (
                <ul className={styles.songList}>
                  {playlist.songs.map((song) => (
                    <li key={song.id}>{song.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <p>Playlist is empty</p>
        )}
      </div>
    </Layout>
  );
};

export default Playlist;