import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Balance from "../../../components/Balance";
import Chart from "./Chart";
import { getIPAssetsCount } from '../../../api/subdomainAPI';


const intervals = ["Last 28 days", "Last 14 days", "Last 7 days"];

const Overview = ({ className }) => {
  const [chartData, setChartData] = useState([]);
  const [sorting, setSorting] = useState(intervals[0]);
  const [totalAssetsCount, setTotalAssetsCount] = useState(0);


  const mapIntervalToParam = (interval) => {
    switch (interval) {
      case "Last 28 days":
        return "month"; // The term 'month' is just an example here
      case "Last 14 days":
        return "biweekly";
      case "Last 7 days":
        return "week";
      default:
        return "week"; // Add a case for "This year" if it's needed
    }
  };


  // src/screens/AssetsDashboard/Overview/index.js

  useEffect(() => {
    const intervalParam = mapIntervalToParam(sorting);
    

    const fetchAssetsCount = async () => {
      try {
        const count = await getIPAssetsCount("week"); // Assuming you want to fetch count for 'week' interval
        setTotalAssetsCount(count);
      } catch (error) {
        console.error("Error fetching assets count:", error);
      }
    };
  
      fetchAssetsCount();

  }, [sorting]);


  const initializeChartData = (interval) => {
    const dataPoints = [];
    let startDate;
    
    // Define the start date based on the interval
    switch (interval) {
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7); // Set to 7 days ago
        break;
      case 'biweekly':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 14); // Set to 14 days ago
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1); // Set to 1 month ago
        break;
      // Other cases can be added here
      default:
        startDate = new Date(); // Fallback to today (can be adjusted as needed)
        break;
    }
  
    // Create data points for each day from the start date to today
    while (startDate <= new Date()) {
      dataPoints.push({
        name: startDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
        count: 0 // Initialize count as zero
      });
      startDate.setDate(startDate.getDate() + 1); // Increment date by 1 day
    }
  
    return dataPoints;
  };

  return (
    <Card
      className={cn(styles.card, className)}
      title="Total Assets"
      classTitle={cn("title-red", styles.cardTitle)}
      classCardHead={styles.cardHead}
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
        <div className={styles.details}>
        <div className={cn("h4", styles.title)}>{totalAssetsCount} Assets</div>
          <div className={styles.line}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              })}
          </div>
        </div>
        <Chart chartData={chartData} />
      </div>
    </Card>
  );
};

export default Overview;