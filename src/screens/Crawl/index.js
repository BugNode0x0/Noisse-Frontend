import React, { useState, useEffect } from "react";
import styles from "./Crawl.module.sass";
import Urls from "./Urls";
import Form from "../../components/Form";
import { getCrawl } from '../../api/subdomainAPI';

const Crawl = () => {
    const [groupedUrls, setGroupedUrls] = useState({});
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { jsview } = await getCrawl(search, 1, 100);
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
    }, [search]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.section}>
            <Form
                className={styles.form}
                value={search}
                setValue={setSearch}
                onSubmit={handleSubmit}
                placeholder="Search URLs"
                type="text"
                name="search"
                icon="search"
            />
            {Object.entries(groupedUrls).map(([subdomain, urls], index) => (
                <Urls key={subdomain} subdomain={subdomain} urls={urls} />
            ))}
        </div>
    );
};

export default Crawl;