import React from 'react';
import styles from './Row.module.sass';

const Row = ({ screenshot_url, website_url, title, status_code, content_length, webserver, tech }) => {
  return (
    <div className={styles.row}>
      <div className={styles.screenshot}>
        <img src={screenshot_url} alt="Screenshot" />
      </div>
      <div className={styles.details}>
        <div className={styles.detail_item}>
          <span className={styles.label}>URL:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{website_url}</span>
        </div>
        <div className={styles.detail_item}>
          <span className={styles.label}>Title:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{title || 'N/A'}</span>
        </div>
        <div className={styles.detail_item}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{status_code}</span>
        </div>
        <div className={styles.detail_item}>
          <span className={styles.label}>Content Length:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{content_length}</span>
        </div>
        <div className={styles.detail_item}>
          <span className={styles.label}>Webserver:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{webserver}</span>
        </div>
        <div className={styles.detail_item}>
          <span className={styles.label}>Tech:</span>
          <span className={`${styles.value} ${styles.code_font}`}>{tech}</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
