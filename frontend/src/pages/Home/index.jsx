import React from 'react';
import Layout from '../../components/Layout';
import NewIn from '../../components/NewIn';
import styles from './Home.module.scss';
import SongList from '../../components/SongList/SongList';

const Home = () => {
  return (
    <Layout>
      <div className={styles.content}>
      <NewIn />
      <SongList/>
      </div>
    </Layout>
  );
};

export default Home;