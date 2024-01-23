import React, { useState } from "react";
import styles from "./NewAsset.module.sass";
import DomainEnumerator from "./DomainEnumerator"

const NewAsset = () => {

    return (
        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <DomainEnumerator className={styles.card} />
                </div>
            </div>
            
        </>
    );
};

export default NewAsset;
