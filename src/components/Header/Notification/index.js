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
    const handleNotification = (notification) => {
      console.log("Received notification:", notification);
      // Update the notifications state
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    };

    socket.on("notification", handleNotification);

    // Clean up event listener on component unmount
    return () => socket.off("notification", handleNotification);
  }, [socket]); // Re-run the effect if socket changes

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
            {notifications.map((notification, index) => (
              <Item className={styles.item} item={notification} key={index} onClose={() => setVisible(false)} />
            ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Notification;
