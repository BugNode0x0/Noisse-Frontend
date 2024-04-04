import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Dropdown from "../../components/Dropdown";
import Urls from "./Urls";
import { downloadWebDomainsCSV } from '../../api/subdomainAPI';

const Hurls = () => {
    const downloadOptions = [
      { label: "Web Domains", value: "Web" }
    ];

  const [search, setSearch] = useState("");
  const [activeDomainType, setActiveDomainType] = useState(downloadOptions[0].value);

  const handleDownload = () => {
    downloadWebDomainsCSV(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //const renderDomainComponent = () => {
  //  switch (activeDomainType) {
  //    case "Web":
  //      return <Urls search={search} limit={3} />;
  //    case "Active":
  //      return <ActiveDomains search={search} limit={3} />;
  //    case "All":
  //      return <AllDomains search={search} limit={3} />;
  //    default:
  //      return null;
  //  }
  //};

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
          <div className={styles.dropdownControl}>
            <Dropdown
              classDropdownHead={styles.dropdownHead}
              value={activeDomainType}
              setValue={setActiveDomainType}
              options={downloadOptions}
              small
            />
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={handleDownload}
            >
              Download CSV
            </button>
          </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          <Urls search={search} limit={3} />
        </div>
      </div>
    </Card>
  );
};

export default Hurls;
