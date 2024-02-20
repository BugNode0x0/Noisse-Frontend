import React from "react";
import styles from "./Urls.module.sass";
import Card from "../../../components/Card"; // Adjust the path as necessary
import Dropdown from "../../../components/Dropdown"; // Adjust the path as necessary

const Urls = ({ subdomain, urls }) => {
    console.log(subdomain, urls);
    // State to control the dropdown visibility
    const [selectedUrl, setSelectedUrl] = React.useState(urls[0]); // Default to the first URL

    const [visible, setVisible] = React.useState(false);

    // Handler to toggle dropdown visibility
    const toggleDropdown = () => setVisible(!visible);

    // Dropdown options
    const dropdownOptions = urls.map(url => ({ value: url, label: url }));
    console.log(dropdownOptions); 

    return (
        <Card className={styles.card}>
            <div className={styles.cardHead} onClick={toggleDropdown}>
                {subdomain}
            </div>
            {visible && (
                <Dropdown
                    className={styles.dropdown}
                    options={dropdownOptions}
                    value={selectedUrl}
                    onChange={setSelectedUrl} // Set the selected URL
                />
            )}
        </Card>
    );
};

export default Urls;
