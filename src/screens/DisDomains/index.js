import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./DisDomains.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import AllDomains from "../DomainDashboard/Domains/AllDomains";
import ActiveDomains from "../DomainDashboard/Domains/ActiveDomains";
import WebDomains from "../DomainDashboard/Domains/WebDomains";
import Dropdown from "../../components/Dropdown";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

const DisDomains = () => {
  const navigation = ["Web", "Active", "All"];
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
      title="Domains"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={handleSubmit}
            placeholder="Search domains"
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
          {activeTab === navigation[0] && <WebDomains  search={search} />}
          {activeTab === navigation[1] && <ActiveDomains  search={search} />}
          {activeTab === navigation[2] && <AllDomains  search={search} />}
        </div>
      </div>
    </Card>
  );
};

export default DisDomains;
