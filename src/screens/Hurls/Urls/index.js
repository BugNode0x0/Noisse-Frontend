  import React, { useState, useContext, useEffect, useMemo } from "react";
  import styles from "./WebDomains.module.sass";
  import Icon from "../../../components/Icon";
  import Row from "./Row";
  import ReactPaginate from 'react-paginate';
  import { getHistoricUrls } from '../../../api/subdomainAPI';
  import { debounce } from 'lodash';


  const ITEMS_PER_PAGE = 10;

  const Urls = ({ search, limit }) => { 
    const [chooseAll, setChooseAll] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE);  
    const [webDomains, setWebDomains] = useState([]);
    const [totalWebDomains, setTotalWebDomains] = useState(0);  
    const [sortConfig, setSortConfig] = useState({ key: 'statusCode', direction: 'ascending' });

    const debouncedFetchWebDomains = debounce(async (search) => {
      try {
        const data = await getHistoricUrls(search, currentPage, ITEMS_PER_PAGE);
        setWebDomains(data.urls);
        setTotalWebDomains(data.total);
      } catch (error) {
        console.error('Error fetching web domains:', error);
      }
    }, 500);

    const onSort = (key) => {
      setSortConfig((currentSortConfig) => {
        let direction = 'ascending';
        if (currentSortConfig.key === key && currentSortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        return { key, direction };
      });
    };

    const handleChange = (id) => {
      if (selectedFilters.includes(id)) {
        setSelectedFilters(selectedFilters.filter((x) => x !== id));
      } else {
        setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
      }
    };

    const totalPages = Math.ceil(totalWebDomains / ITEMS_PER_PAGE);

    const handlePageClick = (data) => {
      const selectedPage = data.selected + 1; // Adjust the page number (+1 because `selected` is zero-based)
      setCurrentPage(selectedPage);
    };


    useEffect(() => {
      debouncedFetchWebDomains(search);
      const fetchWebDomains = async () => {
        try {
          const data = await getHistoricUrls(search, currentPage, ITEMS_PER_PAGE);
          setWebDomains(data.urls); 
          setTotalWebDomains(data.total); 
        } catch (error) {
          console.error('Error fetching web domains:', error);
        }
      };
      fetchWebDomains();

      if (sortConfig !== null) {
        webDomains.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }


    }, [search, currentPage, sortConfig.key, sortConfig.direction]);

    const sortedWebDomains = useMemo(() => {
      let sortableDomains = [...webDomains];
      if (sortConfig.key) {
        sortableDomains.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableDomains;
    }, [webDomains, sortConfig]);


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
          {sortedWebDomains.map((domain, index) => (            
          <Row
              item={domain.urls}
              url={domain.urls}
              key={domain.id}
              up={Urls.length - index <= 2}
              value={selectedFilters.includes(index)}
              onChange={() => handleChange(index)}
            />
          ))}
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
          forcePage={currentPage - 1} // Use forcePage to set correct page
        />
      </div>
      
    );
  };


  export default Urls;
