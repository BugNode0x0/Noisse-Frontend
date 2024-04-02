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
    // Listen for 'notification' events from the server
    const handleNotification = (data) => {
      console.log("Received notification:", data);
    
      let newNotification;
      try {
        // Attempt to parse the notification data as JSON
        newNotification = JSON.parse(data);
      } catch (e) {
        // If parsing fails, treat the data as plain text
        newNotification = { message: data };
      }
    
      // Update the notifications state
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };



    socket.on("notification", handleNotification);

    // Clean up event listener on component unmount
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.notification, className, {
          [styles.active]: visible,
        })}
      >
        <button
          className={cn(styles.head, styles.active)}
          onClick={() => setVisible(!visible)}
        >
          <Icon name="notification" size="24" />
        </button>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.title}>Notification</div>
            <Actions
              className={styles.actions}
              classActionsHead={styles.actionsHead}
              items={actions}
              small
            />
          </div>
          <div className={styles.list}>
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
