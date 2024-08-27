import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import styles from './Library.module.scss';
import { UserPlaylists, createPlaylist } from '../../services/playlist';
import { ToastContainer, toast } from 'react-toastify';
import { FiPlus } from 'react-icons/fi';
import { CreatePlaylistModal } from '../../components/PlaylistModal';
import 'react-toastify/dist/ReactToastify.css';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

    const fetchPlaylists = useCallback(async () => {
      try {
        const userPlaylists = await UserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
      toast.error(error.message);
      }
    }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  const handlePlaylistClick = (id) => {
    if (isValidObjectId(id)) {
      const foundPlaylist = playlists.find(p => p._id === id);
      if (foundPlaylist) {
        navigate(`/playlist/${id}`);
      } else {
        toast.error('Playlist not found');
        console.error('Playlist not found');
      }
    } else {
      console.error('Invalid playlist ID format');
      toast.error('Invalid playlist ID format');
    }
  };

  const handleCreatePlaylist = async (playlistData) => {
    try {
      await createPlaylist(playlistData);
      setIsModalOpen(false);

      const userPlaylists = await UserPlaylists();
      setPlaylists(userPlaylists);
      toast.success('Playlist created successfully');
    } catch (error) {
      toast.error('Failed to create playlist');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className={styles.libraryContainer}>
        <h1>My Library</h1>
        <ToastContainer />
        <button onClick={openModal} className={styles.addPlaylistButton}>
          <FiPlus size={24} />
        </button>
        {playlists.length === 0 ? (
          <p>No playlists found</p>
        ) : (
          <div className={styles.playlistGrid}>
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className={styles.playlistCard}
                onClick={() => handlePlaylistClick(playlist._id)}
              >
                <p>{playlist.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
    </Layout>
  );
};

export default Library;