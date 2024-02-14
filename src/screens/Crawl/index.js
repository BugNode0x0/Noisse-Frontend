import React, { useState, useEffect } from "react";
import styles from "./Crawl.module.sass";
import Urls from "./Urls";
import { getCrawl } from '../../api/subdomainAPI';

const Crawl = () => {
    const [groupedUrls, setGroupedUrls] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { jsview } = await getCrawl('', 1, 100); // Adjust fetch parameters as needed
                const urlsBySubdomain = jsview.reduce((acc, { subdomain, url }) => {
                    acc[subdomain] = acc[subdomain] || [];
                    acc[subdomain].push(url);
                    return acc;
                }, {});

                setGroupedUrls(urlsBySubdomain);
            } catch (error) {
                console.error('Error fetching crawl data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.section}>
            {Object.entries(groupedUrls).map(([subdomain, urls], index) => (
                <Urls key={subdomain} subdomain={subdomain} urls={urls} />
            ))}
        </div>
    );
};

export default Crawl;