import React from "react";
import styles from "./Urls.module.sass";
import Card from "../../../components/Card"; 
import Dropdown from "../../../components/Dropdown";

const Urls = ({ subdomain, urls }) => {
    const [visible, setVisible] = React.useState(false);

    const toggleDropdown = (e) => {
      e.stopPropagation(); // Prevent event bubbling up to the card
      setVisible(!visible);
    };


    return (
        <Card className={styles.card}>
            <div className={styles.card} onClick={toggleDropdown}>
                {subdomain}
            </div>
            {visible && (
                <Dropdown
                    options={urls.map(url => ({ value: url, label: url }))}
                />
            )}
        </Card>
    );
};

export default Urls;