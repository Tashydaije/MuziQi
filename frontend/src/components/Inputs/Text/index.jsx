import React from 'react';
import styles from './styles.module.scss';

const TextInput = ({ label, ...rest }) => {
  return (
    <div className={styles.textInputContainer}>
      <label className={styles.label}>{label}</label>
      <input type="text" className={styles.textInput} {...rest} />
    </div>
  );
};

export default TextInput;