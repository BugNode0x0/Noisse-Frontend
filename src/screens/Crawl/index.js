import React, { useState, useEffect } from "react";
import styles from "./Crawl.module.sass";
import Urls from "./Urls";
import Form from "../../components/Form";
import { getCrawl } from '../../api/subdomainAPI';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 20;

const Crawl = () => {
    const [groupedUrls, setGroupedUrls] = useState({});
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0); 
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { jsview, total } = await getCrawl(search, currentPage, ITEMS_PER_PAGE);
                
                // If 'jsview' is structured correctly from the backend, you can use it directly
                const urlsBySubdomain = jsview.reduce((acc, { subdomain, urls }) => {
                    acc[subdomain] = urls; // Here, 'urls' is assumed to be an array
                    return acc;
                }, {});
    
                setGroupedUrls(urlsBySubdomain);
                setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
            } catch (error) {
                console.error('Error fetching crawl data:', error);
            }
        };
    
        fetchData();
    }, [search, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1); 
        
    };

    return (
        <div className={styles.section}>
            <Form
                className={styles.form}
                value={search}
                setValue={setSearch}
                onSubmit={handleSearchSubmit}
                placeholder="Search URLs"
                type="text"
                name="search"
                icon="search"
            />
            {Object.entries(groupedUrls).map(([subdomain, urls]) => (
    <Urls key={subdomain} subdomain={subdomain} urls={urls} />
))}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                forcePage={currentPage - 1}
            />
        </div>
    );
};

export default Crawl;