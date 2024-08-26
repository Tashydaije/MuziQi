import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signin.module.scss';
import Navbar from '../../components/Navbar';
import { signInUser } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInUser(credentials);
      toast.success("Welcome...");
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <Navbar />
      <form className={styles.signinForm} onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <ToastContainer />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={credentials.email}
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
        <div className={styles.signUpLink}>
          <p>
             Create a new account?{' '}
            <Link to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;