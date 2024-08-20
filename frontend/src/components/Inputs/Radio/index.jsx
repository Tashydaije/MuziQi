import React from 'react';
import styles from './styles.module.scss';

const RadioInput = ({ name, label, value, ...rest }) => {
  return (
    <div className={styles.radioContainer}>
      <input type="radio" id={value} name={name} value={value} className={styles.radio} {...rest} />
      <label htmlFor={value} className={styles.label}>{label}</label>
    </div>
  );
};

export default RadioInput;
