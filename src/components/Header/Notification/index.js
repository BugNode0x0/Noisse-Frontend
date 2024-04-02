import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { SocketContext } from '../../../context/socketContext';
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications.filter(notification => {
      return Date.now() - notification.timestamp < 24 * 60 * 60 * 1000;
    }));
  }, []);

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Notification event received from socket:", data);
  
      let newNotification;
      // Check if data is a string that needs to be parsed as JSON
      if (typeof data === 'string' && data.startsWith('{') && data.endsWith('}')) {
        try {
          newNotification = JSON.parse(data);
          console.log("Parsed notification:", newNotification);
        } catch (error) {
          console.error("Error parsing notification JSON:", error);
          return; // If there is an error, exit early
        }
      } else {
        // Handle the case where data is a plain string or already a parsed object
        newNotification = typeof data === 'string' ? { message: data } : data;
        console.log("Adding plain text notification:", newNotification);
      }
  
      // Update notifications state and local storage
      setNotifications(prevNotifications => {
        const updatedNotifications = [...prevNotifications, newNotification];
        // Save updated notifications to local storage
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
      });
    };
  
    // Listen for 'notification' events from the server
    socket.on("notification", handleNotification);
  
    // Clean up event listener on component unmount
    return () => socket.off("notification", handleNotification);
  }, [socket]);

  const markAsRead = (index) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.filter((_, i) => i !== index);
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  const actions = [
    {
      title: "Mark all as read",
      icon: "check",
      action: () => {
        setNotifications([]); // Clear all notifications
        localStorage.setItem('notifications', JSON.stringify([])); // Update local storage
      },
    },
  ];

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.notification, className, { [styles.active]: visible })}>
        <button className={cn(styles.head, { [styles.active]: visible })} onClick={() => setVisible(!visible)}>
          <Icon name="notification" size="24" />
          {notifications.length > 0 && <span className={styles.counter}>{notifications.length}</span>}
        </button>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.title}>Notifications</div>
            <Actions className={styles.actions} classActionsHead={styles.actionsHead} items={actions} small />
          </div>
          <div className={styles.list}>
      {notifications.length === 0 && <div>No notifications yet.</div>}
      {notifications.map((notification, index) => (
        <Item
          className={cn(styles.item, className)}
          item={notification}
          key={index}
          onClose={() => markAsRead(index)} // Update onClose handler
        />
      ))}
    </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
