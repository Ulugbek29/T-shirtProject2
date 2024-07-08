// CustomSelect.js
import React from 'react';
import styles from './style.module.scss';

function CustomSelect({options, value, onChange }) {
  
  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    onChange(selectedOption);
  };

  return (
    <select className={styles.selectOptions} onChange={handleSelectChange} value={value ? value : ""}>
      <option value="" disabled>Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}

export default CustomSelect;
