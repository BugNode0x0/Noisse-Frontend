import React, { useState, useEffect } from "react";
import styles from "./Notification.module.sass";
import Card from "../../components/Card";
import Icon from "../../components/Icon";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Dummy function to simulate starting and stopping domain monitoring
  const startDomainMonitoring = (domain) => {
    // Add a notification to state
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { type: "start", message: `Enumeration started for ${domain}.`, timestamp: new Date() },
    ]);

    // Simulate domain monitoring end
    setTimeout(() => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { type: "end", message: `Enumeration done for ${domain}.`, timestamp: new Date() },
      ]);
    }, 5000); // 5 seconds for demo
  };

  useEffect(() => {
    // Start monitoring for a domain (this should be triggered by a real event in your application)
    startDomainMonitoring("example.com");
  }, []);

  return (
    <div className={styles.container}>
      {notifications.map((notification, index) => (
        <Card key={index} className={styles.notificationCard}>
          <Icon name="info" size="24" />
          <p className={styles.message}>{notification.message}</p>
          <span className={styles.timestamp}>{notification.timestamp.toLocaleTimeString()}</span>
        </Card>
      ))}
    </div>
  );
};

export default Notification;
