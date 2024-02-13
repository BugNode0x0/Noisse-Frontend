import React, { useState, useEffect } from "react";
import styles from "./AllDomains.module.sass";
import Icon from "../../../components/Icon";
import Row from "./Row";
import ReactPaginate from 'react-paginate';
import { getSubdomains } from '../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 10;  // Set the desired items per page

const Urls = ({ search, limit }) => { // Removed unused 'items' prop
  const [chooseAll, setChooseAll] = useState(false); // Fixed typo setСhooseAll -> setChooseAll
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subdomains, setSubdomains] = useState([]);
  const [totalSubdomains, setTotalSubdomains] = useState(0);


  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const totalPages = Math.ceil(totalSubdomains / ITEMS_PER_PAGE);


  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    console.log('You clicked on page:', selectedPage);
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    const fetchSubdomains = async () => {
      console.log('Fetching page:', currentPage);
      try {
        // Fetch subdomains from the API
        const data = await getSubdomains(search, currentPage, ITEMS_PER_PAGE);
        console.log('Data received:', data); // Debug log
        setSubdomains(data.subdomains);
        setTotalSubdomains(data.total);
      } catch (error) {
        console.error('Error fetching subdomains:', error);
        // Handle error (Maybe update state to show error message to user)
      }
    };
    fetchSubdomains();

    const socket = io('https://noisse-backend-development.up.railway.app/');

    // Open the socket connection
    socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    // Listen for 'subdomain update' events
    socket.on('subdomain update', (data) => {
      console.log('Subdomain update received:', data.message);
      fetchSubdomains(); // Call fetchSubdomains to update the list of subdomains
    });

    // Cleanup function for WebSocket
    return () => {
      socket.off('connect');
      socket.off('subdomain update');
      socket.disconnect();
      console.log('Disconnected from websocket server');
    };
  }, [ search, currentPage]);


  return (
    <div className={styles.all}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
          <div className={styles.iconCheckboxWrapper}>
          <Icon name="globe" size="25" className={styles.icon} />
          </div>
          </div>
          <div className={styles.col}>Domain Name</div>
        </div>
        {subdomains.map((subdomain, index) => (
          <Row
            item={subdomain.subdomain}
            key={index}
            up={subdomains.length - index <= 2}
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
      onPageChange={handlePageClick}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      forcePage={currentPage - 1} // ReactPaginate is zero-based, so subtract 1
    />
    </div>
    
  );
};

export default Urls;
