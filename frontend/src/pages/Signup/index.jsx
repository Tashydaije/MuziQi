import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.scss';
import Navbar from '../../components/Navbar';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    image: null,
  });

  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/signin');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log(formData);
  };

  return (
    <div className={styles.signupContainer}>
      <Navbar />
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          placeholder="Email"
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSignUp}>Sign Up</button>
        <Link to="/signin">
          <button type="button">Go to Sign In</button>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;