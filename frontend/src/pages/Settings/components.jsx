import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { editUser, deleteUser } from '../../services/auth';
import styles from './Components.module.scss';


export const EditProfile = ({ userId }) => {
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    profilePhoto: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const dataToUpdate = { ...formData };
      if (!dataToUpdate.profilePhoto) {
        delete dataToUpdate.profilePhoto;
      }

      const updatedUser = await editUser(userId, dataToUpdate);
      console.log('User updated successfully:', updatedUser);
      window.location.href = '/profile';

    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editProfileForm}>
      <div className={styles.uploadPhoto}>
        <label htmlFor="profilePhotoUpload" className={styles.photoLabel}>
          <input
            id="profilePhotoUpload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className={styles.fileInput}
          />
          {profilePhotoPreview && (
            <div className={styles.photoPreview}>
              <img src={profilePhotoPreview} alt="Profile Preview" />
            </div>
          )}
        </label>
      </div>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        className={styles.textInput}
      />
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
        className={styles.textInput}
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        placeholder="Last Name"
        className={styles.textInput}
      />
      <button type="submit" className={styles.submitButton}>Save Changes</button>
    </form>
  );
};

EditProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export const DeleteAccount = ({ userId }) => {
    const handleDelete = async () => {
      try {
        const result = await deleteUser(userId);
        console.log('User account deleted', result);
      } catch (error) {
        console.error('Error deleting user account', error);
      }
    };
  
    return (
      <div className={styles.deleteForm}>
        <p>Do you wish to delete your Account?</p>
      <button onClick={handleDelete} className={styles.delete}>Delete Account</button>
      </div>
    );
  };

  DeleteAccount.propTypes = {
    userId: PropTypes.string.isRequired,
  };