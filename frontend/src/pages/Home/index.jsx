import React from 'react';
import Navbar from '../../components/Navbar';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of your app.</p>
      {/* Add more content here */}
    </div>
  );
};

export default Home;
