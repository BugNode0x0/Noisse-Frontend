import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./WebView.module.sass";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Views from "./Views";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import { debounce } from 'lodash'; 

const WebView = () => {
  const location = useLocation()
  const params = queryString.parse(location.search);
  const [search, setSearch] = useState(params.search || '');
  const navigate = useNavigate();

  const debouncedSetSearch = debounce((newSearch) => {
    navigate(`/webview?search=${encodeURIComponent(newSearch)}`);
  }, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSetSearch(search);
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setSearch(params.search || '');
  }, [params.tab, params.search]);

  return (     
    <Card
      className={styles.card}
      title="Web Shots"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
          <Form
          className={styles.form}
          value={search}
          setValue={setSearch}
          onSubmit={handleSubmit}
          placeholder="Search web views"
          type="text"
          name="search"
          icon="search"
        />
      }
    >
      <Views search={search} />
    </Card>
  );
};

export default WebView;
