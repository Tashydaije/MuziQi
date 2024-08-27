import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import styles from './Playlist.module.scss';
import { getPlaylistDetails, deletePlaylist, updatePlaylistName } from '../../services/playlist';
import { EditPlaylistModal } from '../../components/PlaylistModal';
import { ToastContainer, toast } from 'react-toastify';
import { FiMoreVertical } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlistId);
      toast.success('Playlist deleted successfully');
      navigate('/library');
    } catch (error) {
      toast.error('Failed to delete playlist');
    }
  };

  const handleEditPlaylist = async (newName) => {
    try {
      await updatePlaylistName(playlistId, newName);
      setPlaylist({ ...playlist, name: newName });
      toast.success('Playlist name updated successfully!');
    } catch (error) {
      toast.error('Failed to update playlist name');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!playlist) {
    return <div>Playlist not found</div>; // Handle the case where playlist is null
  }

  const songs = playlist?.songs || [];

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.playlistContainer}>
        <div className={styles.playlistHeader}>
        <img src={'../../images/playlist.jpeg'} alt="Playlist"/>
          <div className={styles.playlistInfo}>
            <h1>{playlist.name}</h1>
            <div className={styles.menuWrapper}>
              <button 
                className={styles.menuButton} 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FiMoreVertical size={24} />
              </button>
              {menuOpen && (
                <div className={styles.menuDropdown}>
                  <button onClick={() => setIsEditModalOpen(true)}>Edit Playlist</button>
                  <button onClick={handleDeletePlaylist}>Delete Playlist</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.songsContainer}>
          <h2>Songs</h2>
          {songs.length === 0 ? (
            <p>No songs in this playlist</p> // Message when there are no songs
          ) : (
            <ul className={styles.songList}>
              {songs.map((song) => (
                <li key={song.id}>
                  <div className={styles.songInfo}>
                    <span className={styles.songName}>{song.name || 'Unknown Song'}</span>
                    <span className={styles.artistName}>{song.artist || 'Unknown Artist'}</span>
                  </div>
                  <span className={styles.songDuration}>{song.duration || 'Unknown Duration'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <EditPlaylistModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditPlaylist}
          playlistName={playlist.name}
        />
      </div>
    </Layout>
  );
};

export default Playlist;