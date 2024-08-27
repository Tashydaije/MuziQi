import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { UserPlaylists } from '../../services/playlist';
import { UserDetails } from '../../services/auth'
import styles from './Profile.module.scss';
import ProfileImg from '../../images/ProfileImg.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await UserDetails();
        setUser(userDetails);
      } catch (error) {
        toast.error(`Error fetching user details: ${error.message}`);
      }
    };

    const fetchPlaylist = async () => {
      try {
        const userPlaylists = await UserPlaylists();
        setPlaylists(userPlaylists);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserDetails();
    fetchPlaylist ();
  }, []);

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

  return (
    <Layout>
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>
        <ToastContainer />
          {user && (
            <div className={styles.profileDetails}>
              <img
                src={user.profilePhoto || ProfileImg}
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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;