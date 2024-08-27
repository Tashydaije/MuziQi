import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styles from './PlaylistModal.module.scss';

Modal.setAppElement('#root');

export const CreatePlaylistModal = ({ isOpen, onRequestClose, onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name });
    setName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Playlist"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Playlist</button>
        <button onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

CreatePlaylistModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};

export const EditPlaylistModal = ({ isOpen, onRequestClose, onSubmit, playlistName }) => {
    const [newName, setNewName] = useState(playlistName);
  
    const handleSubmit = () => {
      onSubmit(newName);
      onRequestClose(); // Close modal after submission
    };
  
    if (!isOpen) return null;
  
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <h2>Edit Playlist Name</h2>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className={styles.modalActions}>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  EditPlaylistModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    playlistName: PropTypes.string.isRequired,
  };  