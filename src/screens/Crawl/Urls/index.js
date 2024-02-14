import React from "react";
import styles from "./Urls.module.sass";
import Card from "../../../components/Card"; // Adjust the path as necessary
import Dropdown from "../../../components/Dropdown"; // Adjust the path as necessary

const Urls = ({ subdomain, urls }) => {
    // State to control the dropdown visibility
    const [visible, setVisible] = React.useState(false);

    return (
        <Card className={styles.card}>
            <div className={styles.cardHead} onClick={() => setVisible(!visible)}>
                {subdomain}
            </div>
            {visible && (
                <Dropdown>
                {urls.map(url => <div key={url}>{url}</div>)}
              </Dropdown>
            )}
        </Card>
    );
};


export default Urls;