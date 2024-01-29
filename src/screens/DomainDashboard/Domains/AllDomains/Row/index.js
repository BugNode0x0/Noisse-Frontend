// src/screens/DomainDashboard/Domains/AllDomains/Row/index.js

import React from 'react';
import styles from './Row.module.sass';

const Row = ({ item, value, onChange }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
      </div>
      <div className={styles.col}>
        {item} 
      </div>
    </div>
  );
};

export default Row;