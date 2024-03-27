import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import TooltipGlodal from "../../../components/TooltipGlodal";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import socket from "../../../context/socketInstance"
import { 
  getDiscoveredDomainsCount, 
  getActiveDomainsCount, 
  getWebDomainsCount, 
} from '../../../api/subdomainAPI';

const SOCKET_URL = 'https://noisse-backend-development.up.railway.app/socket.io/';

const intervals = ["This Week"];

const Overview = ({ className }) => {
  const generateChartData = (counter) => {
    const dataPoints = []; // Create an array to store the data points
    const steps = 10; // The number of steps or data points you want
  
    for (let i = 0; i <= steps; i++) {
      const value = (counter / steps) * i;
      dataPoints.push({ name: `Point ${i}`, earning: value });
    }
  
    return dataPoints;
  };

  const [sorting, setSorting] = useState(intervals[0]);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [webCount, setWebCount] = useState(0);
  const [discoveredDomainsChartData, setDiscoveredDomainsChartData] = useState(generateChartData(discoveredCount));
  const [activeDomainsChartData, setActiveDomainsChartData] = useState([]);
  const [webDomainsChartData, setWebDomainsChartData] = useState([]);

  const items = [
    {
      title: "Discovered Domains",
      counter: discoveredCount ? discoveredCount.toString() : '0',
      icon: "globe",
      background: "#edf8f2",
      chartColor: "#83BF6E",
      data: discoveredDomainsChartData,
    },
    {
      title: "Active Domains",
      counter: activeCount ? activeCount.toString() : '0',
      icon: "lightning",
      background: "#ecf9fe",
      chartColor: "#2A85FF",
      data: activeDomainsChartData,
    },
    {
      title: "Web Services",
      counter: webCount ? webCount.toString() : '0',
      icon: "cloudcheck",
      background: "#f2efff",
      chartColor: "#8E59FF",
      data: webDomainsChartData,
    },
  ];

  const mapIntervalToParam = (interval) => {
    switch (interval) {
      case "This Week":
        return "week";
      case "Last 14 Days":
        return "biweekly";
      case "Last Month":
        return "month";
      default:
        return "week";
    }
  };

  useEffect(() => {
    const intervalParam = mapIntervalToParam(sorting);

    const fetchCounts = async () => {
      try {
        const discoveredDomainsCountData = await getDiscoveredDomainsCount(intervalParam);
        const activeDomainsCountData = await getActiveDomainsCount(intervalParam);
        const webDomainsCountData = await getWebDomainsCount(intervalParam);
  
        if (discoveredDomainsCountData) {
          setDiscoveredCount(discoveredDomainsCountData);
          setDiscoveredDomainsChartData(generateChartData(discoveredDomainsCountData));
        }
        if (activeDomainsCountData) {
          setActiveCount(activeDomainsCountData);
          setActiveDomainsChartData(generateChartData(activeDomainsCountData));
        }
        if (webDomainsCountData) {
          setWebCount(webDomainsCountData);
          setWebDomainsChartData(generateChartData(webDomainsCountData));
        }
      } catch (error) {
        console.error("Error fetching domain counts:", error);
      }
    };
  
    fetchCounts();

    const handleNewCounts = (data) => {
      console.log("Received data from WebSocket:", data);
      if (data.type === 'discoveredDomains') {
        setDiscoveredCount(data.count);
        setDiscoveredDomainsChartData(generateChartData(data.count));
      } else if (data.type === 'activeDomains') {
        setActiveCount(data.count);
        setActiveDomainsChartData(generateChartData(data.count));
      } else if (data.type === 'webDomains') {
        setWebCount(data.count);
        setWebDomainsChartData(generateChartData(data.count));
      }
    };

    const handleSocketError = (error) => {
      console.error('Socket.IO error in Overview component:', error);
      // Implement appropriate error handling logic
    };
    
    const reconnectSocket = () => {
      console.log('Attempting to reconnect socket in Overview component...');
      socket.connect();
    };


    socket.on('updateCounts', handleNewCounts);
    socket.on('error', handleSocketError);
    socket.on('disconnect', reconnectSocket);
  
    return () => {
      socket.off('updateCounts', handleNewCounts);
      socket.off('error', handleSocketError);
      socket.off('disconnect', reconnectSocket);
      socket.disconnect();
    };
  }, [sorting]);

  return (
    <>
      <Card
        className={cn(styles.card, className)}
        title="Overview"
        classTitle="title-purple"
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