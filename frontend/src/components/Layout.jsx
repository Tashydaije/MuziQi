// src/components/Layout.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Song from './Song';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.sidebar}>
        <Sidebar onNavigate={handleNavigate} />
      </div>
      <main className={styles.main}>
        {activeSection === 'home' && children}
        {activeSection === 'library' && (
          <div className={styles.library}>
            <h1>Library</h1>
            <div className={styles.playlists}>
              {/* Render your playlists here */}
              <div className={styles.playlist}>Playlist 1</div>
              <div className={styles.playlist}>Playlist 2</div>
              <div className={styles.playlist}>Playlist 3</div>
            </div>
          </div>
        )}
      </main>
      <div className={styles.song}>
        <Song />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
