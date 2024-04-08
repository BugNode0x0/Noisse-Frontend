import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./AssetManagement.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import AllAssets from "../AssetsDashboard/Assets/AllAssets";
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { downloadAssetsCSV } from '../../api/subdomainAPI'; // Make sure this path is correct

const AssetManagement = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState("All"); // Default to "All" or use your navigation logic here
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = queryString.parse(location.search);
    setActiveTab(params.tab || "All");
    setSearch(params.search || '');
  }, [location.search]);

  const handleDownload = async () => {
    try {
      await downloadAssetsCSV(search);
    } catch (error) {
      console.error('Failed to download the CSV file:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/domains/view?tab=${activeTab}&search=${search}`);
  };

  return (
    <Card
      className={styles.card}
      title="Assets"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={handleSubmit}
            placeholder="Search assets"
            type="text"
            name="search"
            icon="search"
          />
          <button
            className={cn("button-stroke button-small", styles.button)}
            onClick={handleDownload}
          >
            Download CSV
          </button>
        </>
      }
    >
      <div className={styles.products}>
        <AllAssets search={search} />
      </div>
    </Card>
  );
};

export default AssetManagement;
