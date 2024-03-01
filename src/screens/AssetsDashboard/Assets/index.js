import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import AllAssets from "./AllAssets";
import { downloadAssetsCSV } from '../../../api/subdomainAPI';


const Assets = () => {
  const [search, setSearch] = useState('');

  const handleDownload = async () => {
    try {
      await downloadAssetsCSV(search); // Pass the search term to the download function
    } catch (error) {
      // Handle the error appropriately
      console.error('Failed to download the CSV file:', error);
      // Perhaps show a user-friendly error message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Card
      className={styles.card}
      title='IPs'
      classTitle={cn('title-purple', styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={handleSubmit}
            placeholder='Search IPs' // Changed to 'Search IPs'
            type='text'
            name='search'
            icon='search'
          />
          <button // Removed the div for simplicity, unless it's needed for styling
            className={cn('button-stroke button-small', styles.button)}
            onClick={handleDownload}
          >
            Download CSV
          </button>
        </>
      }
    >
      <div className={styles.products}>
        <AllAssets search={search} limit={3} />
      </div>
    </Card>
  );
};

export default Assets;