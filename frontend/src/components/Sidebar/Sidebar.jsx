import React from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
      </div>
      <div className={styles.content}>
        <ul className={styles.playlist}>
          <li>Playlist 1</li>
          <li>Playlist 2</li>
          <li>Playlist 3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
