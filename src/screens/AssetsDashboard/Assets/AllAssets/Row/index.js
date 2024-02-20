// src/screens/DomainDashboard/Domains/AllDomains/Row/index.js

import React from 'react';
import styles from './Row.module.sass';

const Row = ({ url, title, statusCode, selected, onChange }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
      </div>
      <div className={styles.col}>{url}</div>
      <div className={styles.col}>{title || 'N/A'}</div>
      </div>
  );
};

export default Row;