// src/screens/DomainDashboard/Domains/AllDomains/Row/index.js

import React from 'react';
import styles from './Row.module.sass';
import Checkbox from '../../../../components/Checkbox';

const Row = ({ url, title, statusCode, template, selected, onChange }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Checkbox
          className={styles.checkbox}
          value={selected}
          onChange={onChange}
        />
      </div>
      <div className={styles.col}>{url}</div>
      <div className={styles.col}>{title || 'N/A'}</div>
      <div className={styles.col}>{statusCode}</div>
      <div className={styles.col}>{template}</div>
    </div>
  );
};

export default Row;