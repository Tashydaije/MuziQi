import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { setCurrentSong } from "../../redux/audioPlayer";
import { ClickAwayListener } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./styles.module.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentSong(null));
    window.location = "/login";
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.icon} onClick={() => history.goBack()}>
          <ArrowBackIosRoundedIcon />
        </div>
        <div className={styles.icon} onClick={() => history.goForward()}>
          <ArrowForwardIosRoundedIcon />
        </div>
      </div>
      <div className={styles.right}>
        <div
          className={styles.profileMenu}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AccountCircleIcon />
          <p>{user && user.name}</p>
          {menuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        {menuOpen && (
          <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <div className={styles.menu}>
              <Link to="/me">
                <div className={styles.option}>
                  <p>Profile</p>
                  <PersonIcon />
                </div>
              </Link>
              <div className={styles.option}>
                <p>Settings</p>
                <SettingsIcon />
              </div>
              <div className={styles.option} onClick={handleLogout}>
                <p>Logout</p>
                <LogoutIcon />
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Navbar;
