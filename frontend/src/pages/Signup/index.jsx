import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.scss'
import Navbar from '../../components/Navbar';
import { registerUser } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    profilePhoto: null,
  });

  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : value;

    setFormData({
      ...formData,
      [name]: file,
    });

    if (name === 'profilePhoto' && files[0]) {
      setProfilePhotoPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^@]+@example\.com$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Email must be an '@example.com' email.");
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Sign up successful! Redirecting...");
      navigate('/Signin');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Navbar />
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <ToastContainer />
        <div className={styles.profilePhotoContainer}>
          <label htmlFor="profilePhoto" className={styles.photoLabel}>
            <img
              src={profilePhotoPreview || '../../images/user.png'}
              alt="Profile Preview"
              className={styles.profilePhoto}
            />
          </label>
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (@example.com)"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <div className={styles.signInLink}>
          <p>
            Already with an account?{' '}
            <Link to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;