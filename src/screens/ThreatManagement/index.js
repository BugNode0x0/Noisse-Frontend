import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./ThreatManagement.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import AllThreats from "./AllThreats";
import Dropdown from "../../components/Dropdown";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

const ThreatManagement = () => {
  const navigation = ["All"];
  const location = useLocation()
  const params = queryString.parse(location.search);

  const [activeTab, setActiveTab] = useState(params.tab || navigation[0]);
  const [search, setSearch] = useState(params.search || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/domains/view?tab=${activeTab}&search=${search}`); // Navigate programmatically using navigate
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/domains/view?tab=${newTab}&search=${search}`); // Update the URL
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setActiveTab(params.tab || navigation[0]); 
    setSearch(params.search || '');
  }, [params.tab, params.search]);

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
          <div className={cn(styles.nav, "tablet-hide")}>
            {navigation.map((tabName, index) => (
              <button
                className={cn(styles.link, { [styles.active]: tabName === activeTab })}
                onClick={() => handleTabChange(tabName)}
                key={index}
              >
                {tabName}
              </button>
            ))}
          </div>
          <div className={cn(styles.dropdown, "tablet-show")}>
            <Dropdown
              classDropdownHead={styles.dropdownHead}
              value={activeTab}
              setValue={setActiveTab}
              options={navigation}
              small
            />
          </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          {activeTab === navigation[0] && <AllThreats  search={search} />}
        </div>
      </div>
    </Card>
  );
};

export default ThreatManagement;
