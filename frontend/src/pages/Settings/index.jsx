import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { EditProfile, DeleteAccount } from './components';
import { getUserIdFromToken } from '../../services/auth';
import styles from './Settings.module.scss';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('editProfile');
  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token);

  return (
    <div className={styles.settingsContainer}>
        <Navbar />
      <div className={styles.tabs}>
        <button onClick={() => setActiveTab('editProfile')} className={activeTab === 'editProfile' ? styles.active : ''}>Edit Profile</button>
        <button onClick={() => setActiveTab('deleteAccount')} className={activeTab === 'deleteAccount' ? styles.active : ''}>Delete Account</button>
      </div>
      <div className={styles.content}>
        {activeTab === 'editProfile' && <EditProfile userId={userId} />}
        {activeTab === 'deleteAccount' && <DeleteAccount userId={userId} />}
      </div>
    </div>
  );
};

export default Settings;