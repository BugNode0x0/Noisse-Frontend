import React, { useState } from 'react';
import styles from './Row.module.sass';

const Row = ({ subdomain_id, crawledUrls }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.row}>
      <div onClick={toggleExpanded} className={styles.subdomain}>
        Subdomain ID: {subdomain_id}
        <span className={styles.toggleIcon}>{isExpanded ? '-' : '+'}</span>
      </div>
      {isExpanded && (
        <div className={styles.dropdown}>
          {crawledUrls.map((url, index) => (
            <div key={index} className={styles.url}>
              {url}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Row;