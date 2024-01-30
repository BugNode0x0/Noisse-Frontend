import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { getUserProfile } from '../../api/subdomainAPI';

const Profile = () => {
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
    <Card
      className={styles.card}
      title="Info"
      classTitle={cn("title-red", styles.title)}
    >
      <div className={cn(styles.details)}>
        {userData && (
          <div className={styles.userInfo}>
            <div className={styles.line}>
              <Icon name="person" size="24" />
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
      </div>
    </Card>
  );
};

export default Profile;
