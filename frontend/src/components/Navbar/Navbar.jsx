import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward, MoreVert, Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  const handleHomeClick = () => {
    // Handle home navigation
    window.location.href = '/';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.menuSection}>
        <IconButton onClick={handleMenuClick} className={styles.navButton}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
        </Menu>
      </div>
      <div className={styles.controlsSection}>
        <IconButton onClick={handleHomeClick} className={styles.navButton}>
          <Home />
        </IconButton>
        <IconButton onClick={handleBack} className={styles.navButton}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleForward} className={styles.navButton}>
          <ArrowForward />
        </IconButton>
        <IconButton onClick={handleProfileClick} className={styles.navButton}>
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
