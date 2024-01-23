import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Item from "./Item";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import ChartDomains from "./ChartDomains";
import ChartAssets from "./ChartAssets";
import ChartThreats from "./ChartThreats";


const intervals = ["All time", "In a year", "Per month"];

const nav = [
  {
    title: "Domains",
    counter: "1,024",
    icon: "globe",
    color: "#B1E5FC",
  },
  {
    title: "Assets",
    counter: "1,112",
    icon: "server",
    color: "#CABDFF",
  },
  {
    title: "Threats",
    counter: "80",
    icon: "bug",
    color: "#b30505",
  }
];

const Overview = ({ className }) => {
  const [sorting, setSorting] = useState(intervals[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Card
      className={cn(styles.card, className)}
      title="Overview"
      classTitle="title-red"
      head={
        <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.overview}>
        <div className={styles.nav}>
          {nav.map((x, index) => (
            <Item
              className={cn(styles.item, {
                [styles.active]: index === activeIndex,
              })}
              key={index}
              onActive={() => setActiveIndex(index)}
              item={x}
            />
          ))}
        </div>
        <div className={styles.body}>
          {activeIndex === 0 && <ChartDomains />}
          {activeIndex === 1 && <ChartAssets />}
          {activeIndex === 2 && <ChartThreats />}
        </div>
      </div>
    </Card>
  );
};

export default Overview;
