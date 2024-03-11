import React, { useState, useEffect } from "react";
import styles from "./ActiveDomains.module.sass";
import Icon from "../../../../components/Icon";
import Row from "./Row";
import ReactPaginate from 'react-paginate';
import { getActiveDomains } from '../../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 10;  // Set the desired items per page

const ActiveDomains = ({search, limit}) => { // Removed unused 'items' prop
  const [activeDomains, setActiveDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalActiveDomains, setTotalActiveDomains] = useState(0);
  const [chooseAll, setChooseAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);


  const totalPages = Math.ceil(totalActiveDomains / ITEMS_PER_PAGE);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // Adjust the page number (+1 because `selected` is zero-based)
    setCurrentPage(selectedPage);
  };


  useEffect(() => {
    const fetchActiveDomains = async () => {
      try {
        const data = await getActiveDomains(search, currentPage, ITEMS_PER_PAGE);
        setActiveDomains(data.activeDomains);
        setTotalActiveDomains(data.total);
      } catch (error) {
        console.error('Error fetching active domains:', error);
      }
    };
    fetchActiveDomains();

    const socket = io('https://api.noisse.io/');

    // Listen for 'active domain update' events or similar events tailored for active domains
    socket.on('active domain update', (data) => {
      console.log('Active domain update received:', data.message);
      fetchActiveDomains();
    });

    return () => {
      socket.off('active domain update');
      socket.disconnect();
    };
  }, [search, currentPage]);


  return (
    <div className={styles.all}>
      <div className={styles.table}>
        <div className={styles.row}>
        <div className={styles.col}>
        <div className={styles.iconCheckboxWrapper}>
          <Icon name="lightning" size="25" className={styles.icon}/>
          </div>
          </div>
          <div className={styles.col}>Domain Name</div>
        </div>
        {activeDomains.map((domain, index) => (
          <Row
            item={domain.subdomain}
            key={index}
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

export default ActiveDomains;
