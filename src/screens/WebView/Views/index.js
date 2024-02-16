import React, { useState, useContext, useEffect } from "react";
import styles from "./Views.module.sass";
import Row from "./Row";
import ReactPaginate from 'react-paginate';
import { getScreenshots } from '../../../api/subdomainAPI';
import io from 'socket.io-client';

const ITEMS_PER_PAGE = 20;  // Set the desired items per page

const Views = ({ search }) => { // Removed unused 'items' prop
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [screenshots, setScreenshots] = useState([]);
  const [totalItems, setTotalItems] = useState(0);


  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const data = await getScreenshots(search, currentPage, ITEMS_PER_PAGE);
        setScreenshots(data.webview); 
        setTotalItems(data.total); 
      } catch (error) {
        console.error('Error fetching screenshots', error);
      }
    };
    fetchScreenshots();

    const socket = io('https://noisse-backend-development.up.railway.app/');

    socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    socket.on('screenshot update', (data) => {
      console.log('screenshot update received:', data.message);
      fetchScreenshots();
    });
    
    return () => {
      socket.off('connect');
      socket.off('subdomain update');
      socket.disconnect();
      console.log('Disconnected from websocket server');
    };
  }, [search, currentPage]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };


  return (
    <div className={styles.views}>
      {screenshots.map((item, index) => (
        <Row
          key={index}
          screenshot_url={item.screenshot_url}
          website_url={item.website_url}
          title={item.title}
          status_code={item.status_code}
          content_length={item.content_length}
          webserver={item.webserver}
          tech={item.tech}
        />
      ))}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(totalItems / ITEMS_PER_PAGE)} 
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

export default Views;