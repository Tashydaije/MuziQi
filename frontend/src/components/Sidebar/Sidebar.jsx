import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { UserPlaylists } from '../../services/playlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sidebar = () => {

  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const userPlaylists = await UserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchPlaylist ();
  }, []);

  const isValidObjectId = (id) => /^[a-fA-F0-9]{24}$/.test(id);

  const handlePlaylistClick = (id) => {
    if (isValidObjectId(id)) {
      navigate(`/playlist/${id}`);
    } else {
      console.error('Invalid playlist ID format');
      toast.error('Invalid playlist ID format');
    }
  };

  return (
    <div className={styles.sidebar}>
      <ToastContainer />
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.playlist}>
            <Link to="/library">Library</Link>
        </h2>
        {playlists.length === 0 ? (
          <p>No playlists found</p>
        ) : (
          <ul className={styles.playlistList}>
            {playlists.map((playlist) => (
              <li
                key={playlist.id}
                className={styles.playlistItem}
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <p>{playlist.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;