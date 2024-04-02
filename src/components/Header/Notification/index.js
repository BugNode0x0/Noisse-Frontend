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
    const filteredNotifications = storedNotifications.filter(notification => {
      return Date.now() - notification.timestamp < 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    });
  
    // If we've removed any, update local storage and state
    if (filteredNotifications.length !== storedNotifications.length) {
      localStorage.setItem('notifications', JSON.stringify(filteredNotifications));
    }
  
    setNotifications(filteredNotifications);
  }, []);

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Notification event received from socket:", data);
  
      let newNotification;
      try {
        // Assume data is already a JSON object
        newNotification = (typeof data === 'object') ? data : JSON.parse(data);
      } catch (error) {
        // If not a JSON string, then treat as a simple text message
        newNotification = { message: data };
      }
  
      // Always add a timestamp to the new notification
      newNotification.timestamp = Date.now();
  
      // Update the notifications state and local storage
      setNotifications(prevNotifications => {
        const updatedNotifications = [...prevNotifications, newNotification];
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications.filter(notification => {
          return Date.now() - notification.timestamp < 24 * 60 * 60 * 1000; // Filter out notifications older than 24 hours
        })));
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
