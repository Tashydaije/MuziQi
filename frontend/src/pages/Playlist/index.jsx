import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import styles from './Playlist.module.scss';
import { getPlaylistDetails, deletePlaylist, updatePlaylistName } from '../../services/playlist';
import { EditPlaylistModal } from '../../components/PlaylistModal';
import PlaylistImg from '../../images/PlaylistImg.jpg';
import { Menu, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { FiMoreVertical } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';


const Playlist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  

  const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  const fetchPlaylist = useCallback(async () => {
    if (playlistId || isValidObjectId(playlistId)) {

      try {
        const playlistDetails = await getPlaylistDetails(playlistId);
        setPlaylist(playlistDetails);
        } catch (error) {
          toast.error('Failed to fetch playlist details');
          console.error('Error fetching playlist details:', error);
        } 
      } else {
        toast.error('Invalid playlist ID format');
        console.error('Invalid playlist ID format');
      }
  }, [playlistId]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const songs = playlist?.songs || [];

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.playlistContainer}>
        <div className={styles.playlistHeader}>
        <img src={PlaylistImg} alt="Playlist"/>
          <div className={styles.playlistInfo}>
            <h1>{playlist?.name}</h1>
            <div className={styles.menuWrapper}>
              <button 
                className={styles.menuButton} 
                onClick={handleMenuClick}
              >
              <FiMoreVertical size={24} />
              </button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { handleMenuClose(); setIsEditModalOpen(true); }}>Edit Playlist</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); handleDeletePlaylist(); }}>Delete Playlist</MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <div className={styles.songsContainer}>
          <h2>Songs</h2>
          {songs.length === 0 ? (
            <p>No songs in this playlist</p>
          ) : (
            <ul className={styles.songList}>
              {songs.map((song) => (
                <li key={song.id}>
                  <a
                    href={song.spotifyUrl}
                    target="_blank" // Play the song
                    rel="noopener noreferrer"
                    className={styles.songLink}
                  ></a>
                  <div className={styles.songInfo}>
                    <span className={styles.songName}>{song.title || 'Unknown Song'}</span>
                    <span className={styles.artistName}>{song.artist || 'Unknown Artist'}</span>
                  </div>
                  <span className={styles.songDuration}>{'4:20'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <EditPlaylistModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditPlaylist}
          playlistName={playlist?.name}
        />
      </div>
    </Layout>
  );
};

export default Playlist;