import React from "react";
import styles from "./Urls.module.sass";
import Card from "../../../components/Card"; // Adjust the path as necessary
import Dropdown from "../../../components/Dropdown"; // Adjust the path as necessary

const Urls = ({ subdomain, urls }) => {
    // State to control the dropdown visibility
    const [selectedUrl, setSelectedUrl] = React.useState(urls[0]); // default to the first URL or another appropriate value

    const [visible, setVisible] = React.useState(false);

    return (
        <Card className={styles.card}>
            <div className={styles.cardHead} onClick={() => setVisible(!visible)}>
                {subdomain}
            </div>
            {visible && (
                <Dropdown
                options={urls.map(url => ({ value: url, label: url }))}
                value={selectedUrl}
                setValue={setSelectedUrl} // Pass the state updater function
              />
            )}
        </Card>
    );
};


export default Urls;