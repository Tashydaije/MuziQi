import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, InputBase } from '@mui/material';
import { ArrowBack, ArrowForward, Search as SearchIcon, Home as HomeIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth, logoutUser } from '../../services/auth'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useAuth();

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

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
  };
  

  return (
    <nav className={styles.navbar}>
      <div className={styles.navButtonGroup}>
        <IconButton onClick={handleBack} className={styles.navButton}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleForward} className={styles.navButton}>
          <ArrowForward />
        </IconButton>
        <IconButton component={Link} to="/" className={styles.navButton}>
          <HomeIcon />
        </IconButton>
      </div>

      <div className={styles.searchBar}>
        <InputBase
          placeholder="Type here..."
          inputProps={{ 'aria-label': 'search' }}
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="button" aria-label="search" className={styles.searchIcon} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>

      <div className={styles.flexSpacer}></div>

      <IconButton onClick={handleProfileClick} className={styles.profileMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
      anchorEl={profileAnchorEl}
      open={Boolean(profileAnchorEl)}
      onClose={handleProfileClose}
      >
      {isAuthenticated ? (
        <>
          <MenuItem onClick={handleProfileClose}>
            <Link to="/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>
            <Link to="/settings">Settings</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleProfileClose}>
          <Link to="/signin">Sign In</Link>
        </MenuItem>
      )}
    </Menu>
    </nav>
  );
};

export default Navbar;