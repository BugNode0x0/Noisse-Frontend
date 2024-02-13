import React from "react";
import styles from "./Crawl.module.sass";
import Urls from "./Urls";

const Crawl = () => {
    return (
        <>
            <div className={styles.section}>
                <Urls />
            </div>
        </>
    );
};

export default Crawl;