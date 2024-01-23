import React from "react";
import styles from "./DomainDashboard.module.sass";
import Overview from "./Overview";
import DomainActivity from "./DomainActivity";
import Domains from "./Domains";

const DomainDashboard = () => {
    return (
        <>
            <div className={styles.section}>
                <Overview className={styles.card} />
                <div className={styles.row}>
                    <div className={styles.col}>
                        <DomainActivity />
                    </div>
                </div>
                <Domains />
            </div>
        </>
    );
};

export default DomainDashboard;