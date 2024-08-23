import React from 'react';
import Layout from '../../components/Layout';
import NewIn from '../../components/NewIn';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <Layout>
      <div className={styles.content}>
      <NewIn />
      </div>
    </Layout>
  );
};

export default Home;