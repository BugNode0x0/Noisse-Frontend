import React from "react";
import styles from "./Home.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import ActThreat from "./ActThreat";
import AttackPerspective from "./AttackPerspective";

const Home = () => {
    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Overview className={styles.card} />
                    <AttackPerspective className={styles.card} />
                    <ActThreat className={styles.card} />
                </div>
            </div>
            <TooltipGlodal />
        </>
    );
};

export default Home;
