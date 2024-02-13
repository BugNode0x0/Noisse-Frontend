import React from 'react';
import styles from './Row.module.sass';

const Row = ({ screenshot_url, website_url, title, status_code, content_length, webserver, tech }) => {
  return (
    <div className={styles.row}>
      <div className={styles.screenshot}>
        <img src={screenshot_url} alt="Screenshot" />
      </div>
      <div className={styles.details}>
        <div className={styles.detail-item}>URL: {website_url}</div>
        <div className={styles.detail-item}>Title: {title || 'N/A'}</div>
        <div className={styles.detail-item}>Status: {status_code}</div>
        <div className={styles.detail-item}>Content Length: {content_length}</div>
        <div className={styles.detail-item}>Webserver: {webserver}</div>
        <div className={styles.detail-item}>Tech: {tech}</div>
      </div>
    </div>
  );
};

export default Row;
