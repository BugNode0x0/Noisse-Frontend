import React, { useState, useEffect } from "react";
import styles from "./Urls.module.sass";
import Icon from "../../../components/Icon";
import Row from "./Row";
import ReactPaginate from 'react-paginate';
import { getCrawl } from '../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 10;  // Set the desired items per page

const Urls = ({ search, limit }) => { // Removed unused 'items' prop
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [crawlData, setCrawlData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);


  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const totalPages = Math.ceil(totalSubdomains / ITEMS_PER_PAGE);


  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCrawl(search, currentPage, ITEMS_PER_PAGE);
        setCrawlData(data.jsview); // Assuming your API returns an array of objects with a url and crawledUrls
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching crawl data:', error);
      }
    };
    fetchData();

    const socket = io('https://noisse-backend-development.up.railway.app/');

    // Open the socket connection
    socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    // Listen for 'subdomain update' events
    socket.on('crawl update', (data) => {
      fetchData(); // Call fetchSubdomains to update the list of subdomains
    });

    // Cleanup function for WebSocket
    return () => {
      socket.off('connect');
      socket.off('crawl update');
      socket.disconnect();
      console.log('Disconnected from websocket server');
    };
  }, [ search, currentPage]);


  return (
    <div className={styles.urls}>
      {crawlData.map((data, index) => (
        <Row
          key={index}
          url={data.url}
          crawledUrls={data.crawledUrls} // You'll need to adjust your backend to send this data or restructure it on the frontend
        />
      ))}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(totalItems / ITEMS_PER_PAGE)}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Urls;
