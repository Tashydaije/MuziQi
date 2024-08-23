import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward, Home } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileMenuEl, setProfileMenuEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClick = (event) => {
    setProfileMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileMenuEl(null);
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
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
      
      {/* Home Icon */}
      <IconButton className={styles.homeButton}>
        <Home />
      </IconButton>

      {/* Dropdown Menu */}
      <IconButton onClick={handleMenuClick} className={styles.menuButton}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Option 1</MenuItem>
        <MenuItem onClick={handleClose}>Option 2</MenuItem>
      </Menu>

      {/* User Profile Menu */}
      <IconButton onClick={handleProfileMenuClick} className={styles.profileMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={profileMenuEl}
        open={Boolean(profileMenuEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
