import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "../../../components/Icon";
import { getUserProfile } from '../../../api/subdomainAPI';

const Details = ({ className, onClose }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        if (data.isAuthenticated) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={cn(styles.details, className)}>
      <button className={styles.close} onClick={onClose}>
        <Icon name="close" size="20" />
      </button>
      {userData && (
        <div className={styles.userInfo}>
          {/* Display user avatar */}
          {userData.avatar && (
            <div className={styles.avatar}>
              <img src={userData.avatar} alt="User Avatar" />
            </div>
          )}
          <div className={styles.line}>
            <Icon name="user" size="24" />
            {`${userData.firstName} ${userData.lastName}`}
          </div>
          <a
            className={styles.line}
            href={`mailto:${userData.email}`}
            rel="noopener noreferrer"
          >
            <Icon name="mail" size="24" />
            {userData.email}
          </a>
        </div>
      )}
      {/* Include any other components or elements you need here */}
    </div>
  );
};

export default Details;
