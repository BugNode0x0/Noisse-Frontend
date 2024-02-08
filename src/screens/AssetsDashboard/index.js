import React from "react";
import styles from "./AssetsDashboard.module.sass";
import Overview from "./Overview";
import AssetActivity from "./AssetActivity";
import Assets from "./Assets";

// <Overview className={styles.card} /> add this later

const AssetsDashboard = () => {
  return (
      <>
          <div className={styles.section}>
              
              <div className={styles.row}>
                  <div className={styles.col}>
                      <AssetActivity />
                  </div>
              </div>
              <Assets />
          </div>
      </>
  );
};

export default AssetsDashboard;