import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Balance from "../../../components/Balance";
import { 
  getDiscoveredDomainsCount, 
  getActiveDomainsCount, 
  getWebDomainsCount, 
} from '../../../api/subdomainAPI';

const intervals = ["This week", "This month", "This year"];



const Overview = ({ className }) => {


  const [sorting, setSorting] = useState(intervals[0]);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [webCount, setWebCount] = useState(0);


  const items = [
    {
      title: "Discovered Domains",
      counter: discoveredCount ? discoveredCount.toString() : '0',
      icon: "globe",
      background: "#edf8f2",
    },
    {
      title: "Active Domains",
      counter: activeCount ? activeCount.toString() : '0', // Use activeCount here
      icon: "lightning",
      background: "#ecf9fe",
    },
    {
      title: "Web Services",
      counter: webCount ? webCount.toString() : '0', // Use webCount here
      icon: "cloudcheck",
      background: "#f2efff",
    },
  ];

  const mapIntervalToParam = (interval) => {
    switch (interval) {
      case "This week":
        return "week";
      case "This month":
        return "month";
      case "This year":
        return "year";
      default:
        return "week"; // Default case if required
    }
  };

  useEffect(() => {
    const intervalParam = mapIntervalToParam(sorting);
  
    const fetchCounts = async () => {
      try {
        const discoveredDomainsCountData = await getDiscoveredDomainsCount(intervalParam);
        const activeDomainsCountData = await getActiveDomainsCount(intervalParam);
        const webDomainsCountData = await getWebDomainsCount(intervalParam);
  
      } catch (error) {
        console.error("Error fetching domain counts:", error);
      }
    };
  
    fetchCounts();
  }, [sorting]);



  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Overview"
        classTitle="title-purple"
        head={
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            onChange={(value) => setSorting(value)}
            options={intervals}
            value={sorting}
            setValue={setSorting}
            small
          />
        }
      >
        <div className={styles.overview}>
          <div className={styles.list}>
            {items.map((x, index) => (
              <div
                className={styles.item}
                key={index}
                style={{ backgroundColor: x.background }}
              >
                <div className={styles.icon}>
                  <Icon name={x.icon} size="24" />{" "}
                </div>
                <div className={styles.line}>
                  <div className={styles.details}>
                    <div className={styles.category}>
                      {x.title}
                      <Tooltip
                        className={styles.tooltip}
                        title="Small description"
                        icon="info"
                        place="right"
                      />
                    </div>
                    <div className={styles.counter}>{x.counter}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <TooltipGlodal />
    </>
  );
};

export default Overview;