import React, { useState, useContext, useEffect } from "react";
import styles from "./AllAssets.module.sass";
import Icon from "../../../../components/Icon";
import Row from "./Row";// Row.js
import ReactPaginate from 'react-paginate';
import { getIPAssets } from '../../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 10;  // Set the desired items per page

const AllAssets = ({ search, limit }) => { // Removed unused 'items' prop
  const [chooseAll, setChooseAll] = useState(false); // Fixed typo setСhooseAll -> setChooseAll
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);  
  const [assetsIps, setassetsIps] = useState([]);
  const [totalassetsIps, setTotalassetsIps] = useState(0);  

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const totalPages = Math.ceil(totalassetsIps / ITEMS_PER_PAGE);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // Adjust the page number (+1 because `selected` is zero-based)
    setCurrentPage(selectedPage);
  };


  useEffect(() => {
    const fetchassetsIps = async () => {
      try {
        const data = await getIPAssets(search, currentPage, ITEMS_PER_PAGE);
        setassetsIps(data.assetsIps); // Assuming the response has a 'assetsIps' property
        setTotalassetsIps(data.total); // Assuming the response has a 'total' property
      } catch (error) {
        console.error('Error fetching web domains:', error);
      }
    };
    fetchassetsIps();

    const socket = io('https://noisse-backend-development.up.railway.app/');

    // Open the socket connection
    socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    // Listen for 'subdomain update' events
    socket.on('web domain update', (data) => {
      console.log('Web domain update received:', data.message);
      fetchassetsIps();
    });
    
    // Cleanup function for WebSocket
    return () => {
      socket.off('connect');
      socket.off('subdomain update');
      socket.disconnect();
      console.log('Disconnected from websocket server');
    };
  }, [search, currentPage]);


  return (
    <div className={styles.all}>
      <div className={styles.table}>
        <div className={styles.row}>
        <div className={styles.col}>
        <div className={styles.iconCheckboxWrapper}>
            <Icon name="server" size="25" className={styles.icon} />
        </div>
          </div>
          <div className={styles.col}>IP</div>
          <div className={styles.col}>Host</div>
          <div className={styles.col}>Status Code</div>
        </div>
        {assetsIps.map((domain, index) => (
          <Row
            item={domain.a}
            url={domain.a}
            title={domain.host}
            statusCode={domain.status_code}
            key={index}
            up={AllAssets.length - index <= 2}
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

export default AllAssets;