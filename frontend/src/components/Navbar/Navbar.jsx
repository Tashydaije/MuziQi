import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, InputBase } from '@mui/material';
import { ArrowBack, ArrowForward, Search as SearchIcon, Home as HomeIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for programmatic navigation

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

  return (
    <nav className="fixed top-0 w-full bg-red-700 flex items-center justify-between p-4 z-50 shadow-lg">
      {/* Navigation Buttons */}
      <div className="flex items-center">
        <IconButton onClick={handleBack} className="text-white mx-2">
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleForward} className="text-white mx-2">
          <ArrowForward />
        </IconButton>
        <IconButton component={Link} to="/" className="text-white mx-2">
          <HomeIcon />
        </IconButton>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full px-4 py-1 ml-5 w-72">
        <InputBase
          placeholder="Type here..."
          inputProps={{ 'aria-label': 'search' }}
          className="flex-grow px-2 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton type="button" aria-label="search" className="text-gray-400" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>

      {/* Spacer to push user profile to the end */}
      <div className="flex-grow"></div>

      {/* User Profile Menu */}
      <IconButton onClick={handleProfileClick} className="text-gray-200 text-xl mr-3 cursor-pointer">
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
      >
        <MenuItem onClick={handleProfileClose}><Link to="/profile">Profile</Link></MenuItem>
        <MenuItem onClick={handleProfileClose}><Link to="/signin">Signin</Link></MenuItem>
        <MenuItem onClick={handleProfileClose}><Link to="/signup">Signup</Link></MenuItem>
        <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
        <MenuItem onClick={handleProfileClose}>Signout</MenuItem>
      </Menu>
    </nav>
  );
};

export default Navbar;
