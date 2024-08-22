import React from 'react';
import { IconButton } from '@mui/material';
import { Close, Menu, Search } from '@mui/icons-material';
import styles from './Sidebar.module.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <IconButton onClick={toggleSidebar} className={styles.closeButton}>
        {isOpen ? <Close /> : <Menu />}
      </IconButton>
      <div className={styles.content}>
        <IconButton className={styles.searchButton}>
          <span>Search</span>
          <Search />
        </IconButton>
        <ul className={styles.playlist}>
          <li>Playlist 1</li>
          <li>Playlist 2</li>
          <li>Playlist 3</li>
          {/* Add more playlist items */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;