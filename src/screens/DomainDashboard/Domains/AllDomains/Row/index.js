// src/screens/DomainDashboard/Domains/AllDomains/Row/index.js

import React from 'react';
import styles from './Row.module.sass';
import Checkbox from '../../../../../components/Checkbox';

const Row = ({ item, value, onChange }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Checkbox
          className={styles.checkbox}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className={styles.col}>
        {item} 
      </div>
    </div>
  );
};

export default Row;