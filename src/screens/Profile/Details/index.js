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
          <div className={styles.line}>
            <Icon name="person" size="24" />
            {`${userData.firstName} ${userData.lastName}`}
          </div>
            <Icon name="mail" size="24" />
            {userData.email}
        </div>
      )}
    </div>
  );
};

export default Details;
