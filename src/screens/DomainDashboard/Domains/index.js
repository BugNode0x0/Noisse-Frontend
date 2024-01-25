import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import AllDomains from "./AllDomains";
import ActiveDomains from "./ActiveDomains";
import WebDomains from "./WebDomains";



const Domains = () => {
  const navigation = ["Web", "Active", "All"];

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

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
            onSubmit={() => handleSubmit()}
            placeholder="Search domains"
            type="text"
            name="search"
            icon="search"
          />
          <div className={styles.control}>
            <button className={cn("button-stroke button-small", styles.button)}>
              Deleted
            </button>
            <button className={cn("button-stroke button-small", styles.button)}>
              Set status
            </button>
            <div className={styles.counter}>3 selected</div>
          </div>
          <div className={cn(styles.nav, "tablet-hide")}>
            {navigation.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: x === activeTab,
                })}
                onClick={() => setActiveTab(x)}
                key={index}
              >
                {x}
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
          {activeTab === navigation[0] && <WebDomains  search={search} limit={3}/>}
          {activeTab === navigation[1] && <ActiveDomains  search={search} limit={3}/>}
          {activeTab === navigation[2] && <AllDomains  search={search} limit={3}/>}
        </div>
      </div>
    </Card>
  );
};

export default Domains;
