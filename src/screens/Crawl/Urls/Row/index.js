import React from 'react';
import styles from './Row.module.sass';
import Dropdown from "../../../../components/Dropdown"; // Ensure this path is correct

const Row = ({ subdomain_id, crawledUrls }) => {
  // Convert crawledUrls into the format expected by the Dropdown component
  const dropdownOptions = crawledUrls.map(url => ({
    value: url,
    label: url
  }));

  // State to hold the selected URL from the dropdown, initially the first URL
  const [selectedUrl, setSelectedUrl] = React.useState(dropdownOptions[0].value);

  return (
    <div className={styles.row}>
      <div className={styles.subdomain}>
        Subdomain ID: {subdomain_id}
      </div>
      <Dropdown
        className={styles.dropdown}
        value={selectedUrl}
        setValue={setSelectedUrl}
        options={dropdownOptions}
        small
      />
    </div>
  );
};

export default Row;