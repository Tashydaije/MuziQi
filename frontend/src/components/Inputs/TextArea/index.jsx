import React from 'react';
import styles from './styles.module.scss';

const TextArea = ({ label, ...rest }) => {
  return (
    <div className={styles.textAreaContainer}>
      <label className={styles.label}>{label}</label>
      <textarea className={styles.textArea} {...rest} />
    </div>
  );
};

export default TextArea;
