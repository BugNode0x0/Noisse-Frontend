  import React, { useState, useContext, useEffect, useMemo } from "react";
  import styles from "./WebDomains.module.sass";
  import Icon from "../../../components/Icon";
  import Row from "./Row";
  import ReactPaginate from 'react-paginate';
  import { getHistoricUrls } from '../../../api/subdomainAPI';
  import { debounce } from 'lodash';


  const ITEMS_PER_PAGE = 10;

  const Urls = ({ search, limit }) => { 
    const [currentPage, setCurrentPage] = useState(1);
    const [webDomains, setWebDomains] = useState([]);
    const [totalWebDomains, setTotalWebDomains] = useState(0);

    const fetchWebDomains = debounce(async (searchValue, page) => {
      try {
        const data = await getHistoricUrls(searchValue, page, ITEMS_PER_PAGE);
        if (data && Array.isArray(data.urls) && typeof data.total === 'number') {
          setWebDomains(data.urls);
          setTotalWebDomains(data.total);
        } else {
          throw new Error('Invalid data structure received from getHistoricUrls');
        }
      } catch (error) {
        console.error('Error fetching historical URLs:', error);
        setWebDomains([]);
        setTotalWebDomains(0);
      }
    }, 500);
  
    useEffect(() => {
      fetchWebDomains(search, currentPage);
      // Clean up function to cancel debounce if component unmounts or dependencies change
      return () => fetchWebDomains.cancel();
    }, [search, currentPage, fetchWebDomains]);
  
    const totalPages = Math.max(Math.ceil(totalWebDomains / ITEMS_PER_PAGE), 1);
  
    const handlePageClick = (data) => {
      setCurrentPage(data.selected + 1);
    };
  
    return (
      <div className={styles.all}>
        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.col}>
            <div className={styles.iconCheckboxWrapper}>
              <Icon name="cloudcheck" size="25" className={styles.icon} />
          </div>
            </div>
            <div className={styles.col}>URL</div>
          </div>
          {webDomains.length === 0 ? (
            <div className={styles.noResults}>No URLs found.</div>
          ) : (
            webDomains.map((url, index) => (
              <Row key={index} url={url} />
            ))
          )}
        </div>
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
  
  
  export default Urls;
