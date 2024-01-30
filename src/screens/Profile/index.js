import React from "react";
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
        {/* Include the Details component or other components as needed */}
      </div>
    </Card>
  );
};

export default Profile;
