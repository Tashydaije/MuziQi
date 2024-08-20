import React from 'react';
import styles from './styles.module.scss';

const SelectInput = ({ label, options, ...rest }) => {
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <select className={styles.selectInput} {...rest}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
