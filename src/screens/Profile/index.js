import React, { useState, useEffect } from "react"; // Import useState and useEffect
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Details from "./Details";
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
      classCardHead={styles.head}
    >
      <div className={styles.profile}>
        {userData && (
          <>
            <h3>{`${userData.firstName} ${userData.lastName}`}</h3>
            <p>{userData.email}</p>
          </>
        )}
        <Details /> {/* Assuming you want to include the Details component */}
      </div>
    </Card>
  );
};

export default Profile;
