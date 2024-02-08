import React, { useState, useEffect } from "react";
import styles from "./AssetActivity.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Item from "./Item";
import {
  getDiscoveredDomainsCount,
  getIPAssetsCount,
} from '../../../api/subdomainAPI';


// Utility function to get the date range for the current week
function getCurrentWeekRange() {
  const currentDate = new Date();
  const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1); // adjust when day is Sunday
  const lastDayOfWeek = firstDayOfWeek + 6; // last day is the first day + 6

  const startOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
  const endOfWeek = new Date(currentDate.setDate(lastDayOfWeek));

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
  };
}

// Format date to "dd MMM" format
function formatDate(date) {
  const options = { day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
}

const AssetActivity = () => {
  const intervals = ["Last 2 weeks", "Last 7 days"];
  const [activeTab, setActiveTab] = useState(intervals[0]);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const { start, end } = getCurrentWeekRange();
  const [weekRange, setWeekRange] = useState(getCurrentWeekRange());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWeekRange(getCurrentWeekRange());
    }, 604800000); // 604800000 milliseconds = 7 days

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const discoveredData = await getIPAssetsCount('week');

        // Update state with the fetched data
        setDiscoveredCount(discoveredData);
      } catch (error) {
        console.error("Error fetching domain activity data:", error);
      }
    };
  
    fetchCountData();
  }, [activeTab]);

  const items = [
    {
      title: `${weekRange.start} - ${weekRange.end}`,
      products: {
        counter: discoveredCount,
        color: "#B5E4CA",
              },
    },
  ];

  return (
    <Card
    className={cn(styles.card, styles['domain-activity-card'])}
      title="Asset IP activity"
      classTitle="title-green"
      head={
        <Dropdown
          className={cn(styles.dropdown, "mobile-hide")}
          classDropdownHead={styles.dropdownHead}
          value={activeTab}
          setValue={setActiveTab}
          options={intervals}
          small
        />
      }
    >
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>Week</div>
          <div className={styles.col}>Discovered</div>
        </div>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>
              <div className={styles.label}>Week</div>
              {x.title}
            </div>
            <div className={styles.col}>
              <Item className={styles.item} item={x.products} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.nav}>
        {intervals.map((x, index) => (
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
    </Card>
  );
};

export default AssetActivity;
