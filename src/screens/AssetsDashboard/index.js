import React from "react";
import styles from "./AssetsDashboard.module.sass";
import Overview from "./Overview";
import AssetActivity from "./AssetActivity";
import Assets from "./Assets";


const AssetsDashboard = () => {
  return (
      <>
          <div className={styles.section}>
              <Overview className={styles.card} />
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