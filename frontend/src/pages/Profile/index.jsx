import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UserPlaylists } from '../../services/playlist';
import { UserDetails } from '../../services/auth'
import styles from './Profile.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) throw new Error('No token found in localStorage');
        
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.id;
        
        if (!userId) throw new Error('User ID is missing from token');
        
        const userDetails = await UserDetails(userId);
        setUser(userDetails);
      } catch (error) {
        toast.error(`Error fetching user details: ${error.message}`);
      }
    };

    const fetchPlaylist = async () => {
      try {
        const userPlaylists = await UserPlaylists();
        setPlaylists(userPlaylists);
        toast.success('Playlists fetched successfully!');
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserDetails(), fetchPlaylist ();
  }, []);

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <Layout>
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
        <ToastContainer />
          {user && (
            <div className={styles.profileDetails}>
              <img
                src={user.profilePhoto || '../../images/'}
                alt="Profile"
                className={styles.profilePhoto}
              />
              <div className={styles.userInfo}>
                <h1>{user.username}</h1>
              </div>
            </div>
          )}
          <hr className={styles.separator} />
          <div className={styles.playlists}>
            <h2>
            <Link to="/library">My Library</Link>
            </h2>
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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;