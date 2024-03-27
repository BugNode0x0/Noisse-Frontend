import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Notification.module.sass";
import Icon from "../../Icon";
import Actions from "../../Actions";
import Item from "./Item";
import io from 'socket.io-client';
import { getHunterId } from '../../../api/subdomainAPI';


// Replace with the actual socket URL
const SOCKET_URL = 'https://noisse-backend-development.up.railway.app';

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

  useEffect(() => {
    // Fetch the hunter_id and establish socket connection
    const setupNotifications = async () => {
      try {
        const hunterId = await getHunterId(); // Fetch the hunter_id using the function from SubdomainAPI.js
        if (hunterId) {
          const socket = io(SOCKET_URL, { 
            withCredentials: true,
            transports: ['websocket'], // Use WebSocket transport only
            pingInterval: 25000, // Send a ping every 25 seconds
            pingTimeout: 60000 // Increase the ping timeout to 60 seconds
          });
          socket.emit('authenticate', hunterId);


          socket.on('notification', (notification) => {
          console.log('Received notification:', notification);
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

          socket.on('error', (error) => {
            console.error('Socket.IO error in Notification component:', error);
            // Implement appropriate error handling logic
          });
          
          
          socket.on('disconnect', () => {
            console.log('Socket disconnected in Notification component. Attempting to reconnect...');
            socket.connect();
          });
  
  
          // Add event listeners for 'ping' and 'pong' events
          socket.on('ping', () => {
            console.log('Received ping from server');
          });
  
          socket.on('pong', (latency) => {
            console.log(`Received pong from server with latency: ${latency}ms`);
          });
  
          // Return a cleanup function to disconnect the socket when the component unmounts
          return () => {
            socket.off('notification');
            socket.off('ping');
            socket.off('pong');
            socket.off('error');
            socket.off('disconnect');
            socket.disconnect();
          };
        }
      } catch (error) {
        console.error('Error setting up notifications:', error);
      }
    };
  
    setupNotifications();
  }, []);

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
