import React from "react";
import styles from "./CustomerList.module.sass";
import cn from "classnames";
import Card from "../../components/Card";
import Details from "./Details";

const Profile = () => {
  return (
    <Card
      className={styles.card}
      title="Customer"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
    >
      <Details className={styles.details} />
    </Card>
  );
};

export default Profile;
