import React from 'react';
import styles from './styles.module.scss';

const CheckboxInput = ({ label, ...rest }) => {
  return (
    <div className={styles.checkboxContainer}>
      <input type="checkbox" id="checkbox" className={styles.checkbox} {...rest} />
      <label htmlFor="checkbox" className={styles.label}>{label}</label>
    </div>
  );
};

export default CheckboxInput;
