// src/screens/Crawl/Urls/Row/index.js

import React, { useState } from 'react';
import styles from './Row.module.sass';
import Icon from "../../../../components/Icon"; // Update the import path if necessary

const Row = ({ url, crawledUrls }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.row} onClick={toggleExpanded}>
      <div className={styles.col}>
        <Icon name="chevron-down" size="24" className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`} />
      </div>
      <div className={styles.col}>
        {url}
        {isExpanded && (
          <div className={styles.dropdown}>
            {crawledUrls.map((crawledUrl, index) => (
              <div key={index} className={styles.crawledUrl}>
                {crawledUrl}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Row;
