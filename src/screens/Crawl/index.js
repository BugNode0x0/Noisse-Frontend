import React, { useState, useEffect } from "react";
import styles from "./Crawl.module.sass";
import Urls from "./Urls";
import { getCrawl } from '../../api/subdomainAPI';

const Crawl = () => {
    const [crawlData, setCrawlData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Here you would handle pagination or decide how to fetch all data
                const data = await getCrawl('', 1, 100); // Example call, adjust as necessary
                setCrawlData(data.jsview);
            } catch (error) {
                console.error('Error fetching crawl data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.section}>
            {crawlData.map((data, index) => (
                <Urls key={data.subdomain_id} subdomain={data.subdomain} urls={data.urls} />
            ))}
        </div>
    );
};

export default Crawl;