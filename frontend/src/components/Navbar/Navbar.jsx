import React , { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward, Home, Menu as MenuIcon} from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Navbar.module.scss';
import Sidebar from '../Sidebar'

const Navbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <>
    <nav className={styles.navbar}>
      <div className={styles.menuSection}>
          <IconButton onClick={toggleSidebar} className={styles.navButton}>
            <MenuIcon />
          </IconButton>
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
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Navbar;