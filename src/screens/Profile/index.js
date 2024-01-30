import React from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Details from "./Details";

const Profile = () => {
  return (
    <Card
      className={styles.card}
      title="Info"
      classTitle={cn("title-red", styles.title)}
    >
      <Details /> {/* The Details component will handle user data fetching */}
    </Card>
  );
};

export default Profile;
