import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from "@mui/material";
import styles from './Button.module.css';


const Button = ({ children, onClick, type = 'button', variant = 'primary', size = 'medium', disabled = false, isFetching = false, label }) => {
    return (
      <button 
        className={`${styles.button} ${styles[variant]} ${styles[size]}`} 
        onClick={onClick} 
        type={type} 
        disabled={disabled || isFetching}
      >
        {isFetching ? (
          <CircularProgress size={25} style={{ color: "black" }} />
        ) : (
          label || children
        )}
      </button>
    );
  };
  
  Button.propTypes = {
    children: PropTypes.node, // Content inside the button
    onClick: PropTypes.func.isRequired, // Function to call when the button is clicked
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Type of the button
    variant: PropTypes.oneOf(['primary', 'secondary', 'danger']), // Button style
    size: PropTypes.oneOf(['small', 'medium', 'large']), // Button size
    disabled: PropTypes.bool, // Disable state of the button
    isFetching: PropTypes.bool, // Loading state of the button
    label: PropTypes.string, // Text label inside the button
  };
  
  export default Button;