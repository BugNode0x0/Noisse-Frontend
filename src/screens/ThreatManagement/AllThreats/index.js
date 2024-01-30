import React, { useState, useContext, useEffect } from "react";
import styles from "./AllThreats.module.sass";
import Icon from "../../../components/Icon";
import Row from "./Row";
import ReactPaginate from 'react-paginate';
import { getThreats } from '../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 10;  // Set the desired items per page

const AllThreats = ({ search, limit }) => { // Removed unused 'items' prop
  const [chooseAll, setChooseAll] = useState(false); // Fixed typo setСhooseAll -> setChooseAll
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);  
  const [Threats, setThreats] = useState([]);
  const [totalThreats, setTotalThreats] = useState(0);  

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const totalPages = Math.ceil(totalThreats / ITEMS_PER_PAGE);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1; // Adjust the page number (+1 because `selected` is zero-based)
    setCurrentPage(selectedPage);
  };


  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const data = await getThreats(search, currentPage, ITEMS_PER_PAGE);
        setThreats(data.Threats); // Assuming the response has a 'Threats' property
        setTotalThreats(data.total); // Assuming the response has a 'total' property
      } catch (error) {
        console.error('Error fetching web domains:', error);
      }
    };
    fetchThreats();

    const socket = io('https://noisse-backend-production.up.railway.app/');

    // Open the socket connection
    socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    // Listen for 'subdomain update' events
    socket.on('web domain update', (data) => {
      console.log('Web domain update received:', data.message);
      fetchThreats();
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
          <div className={styles.col}>URL</div>
          <div className={styles.col}>Threat</div>
          <div className={styles.col}>Severity</div>
          <div className={styles.col}>Template</div>
        </div>
        {Threats.map((domain, index) => (
          <Row
            item={domain.matched_at}
            url={domain.matched_at}
            title={domain.name}
            statusCode={domain.severity}
            template={domain.template_id}
            key={index}
            up={AllThreats.length - index <= 2}
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

export default AllThreats;