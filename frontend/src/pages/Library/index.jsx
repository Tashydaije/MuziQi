import React, { useEffect, useState } from 'react';
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
        <h4>My Library</h4>
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
      <CreatePlaylistModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
    </Layout>
  );
};

export default Library;