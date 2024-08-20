import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreatePlaylist = () => {
    setLoading(true);
    createPlayList(dispatch).finally(() => setLoading(false));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.linkWrapper}>
        <NavLink to="/" exact className={styles.link} activeClassName={styles.active}>
          <HomeIcon className={styles.icon} />
          Home
        </NavLink>
        <NavLink to="/search" className={styles.link} activeClassName={styles.active}>
          <SearchIcon className={styles.icon} />
          Search
        </NavLink>
        <NavLink to="/library" className={styles.link} activeClassName={styles.active}>
          <LibraryMusicIcon className={styles.icon} />
          Your Library
        </NavLink>
      </div>
      <div className={styles.divider} />
      <div className={styles.createPlaylist} onClick={handleCreatePlaylist}>
        <AddIcon className={styles.icon} />
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <span>Create Playlist</span>
        )}
      </div>
      <NavLink to="/liked-songs" className={styles.link} activeClassName={styles.active}>
        <FavoriteIcon className={styles.icon} />
        Liked Songs
      </NavLink>
    </div>
  );
};

export default Sidebar;
