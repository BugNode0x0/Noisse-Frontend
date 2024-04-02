import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { SocketContext } from '../../../context/socketContext';
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Delete notifications",
    icon: "trash",
    action: () => console.log("Delete notifications"),
  },
];

const Notification = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleNotification = (data) => {
      console.log("Notification event received from socket:", data);

      try {
        const notification = JSON.parse(data);
        console.log("Parsed notification:", notification);

        setNotifications((prevNotifications) => {
          const updatedNotifications = [...prevNotifications, notification];
          console.log("Updated notifications state:", updatedNotifications);
          return updatedNotifications;
        });
      } catch (error) {
        console.error("Error parsing notification data:", error);
      }
    };

    // Listen for 'notification' events from the server
    socket.on("notification", handleNotification);

    // Clean up event listener on component unmount
    return () => socket.off("notification", handleNotification);
  }, [socket]);

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
            onClose={() => setVisible(false)}
          />
        ))}
      </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
