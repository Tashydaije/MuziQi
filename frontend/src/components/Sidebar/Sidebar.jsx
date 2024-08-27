// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import PropTypes from 'prop-types';


const Sidebar = ({ isOpen }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
      </div>
      <div className={styles.content}>
        <ul className={styles.playlist}>
          <li>
            <Link to="/library">Library</Link>
          </li>
          {/* Add other links or items here */}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

Sidebar.defaultProps = {
  isOpen: false,
};

export default Sidebar;