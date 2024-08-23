import React, { useState } from 'react';
import styles from './Signin.module.scss';
import Navbar from '../../components/Navbar';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log(credentials);
  };

  return (
    <div className={styles.signinContainer}>
      <Navbar />
      <form className={styles.signinForm} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;