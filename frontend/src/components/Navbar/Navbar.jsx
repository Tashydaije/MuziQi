import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const handleBack = () => {
    // Handle back navigation
    window.history.back();
  };

  const handleForward = () => {
    // Handle forward navigation
    window.history.forward();
  };

  return (
    <nav className={styles.navbar}>
      <IconButton onClick={handleBack} className={styles.navButton}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={handleForward} className={styles.navButton}>
        <ArrowForward />
      </IconButton>
    </nav>
  );
};

export default Navbar;



