// src/screens/DomainDashboard/Domains/AllDomains/Row/index.js

import React from 'react';
import styles from './Row.module.sass';

const Row = ({ url, title, statusCode, contentLength, webServer, technology,selected, onChange }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
      </div>
      <div className={styles.col}>{url}</div>
      <div className={styles.col}>{title || 'N/A'}</div>
      <div className={styles.col}>{statusCode}</div>
      <div className={styles.col}>{contentLength}</div>
      <div className={styles.col}>{webServer}</div>
      <div className={styles.col}>{technology}</div>


    </div>
  );
};

export default Row;