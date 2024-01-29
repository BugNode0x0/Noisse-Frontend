import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./DomainEnumerator.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import { enumerateSubdomains, getSubdomains } from '../../../api/subdomainAPI';


const DomainEnumerator = ({ className }) => {
    const [domain, setDomain] = useState('');
    const [isEnumerating, setIsEnumerating] = useState(false);
    const [notification, setNotification] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsEnumerating(true);

      try {
        await enumerateSubdomains(domain);
        setNotification('Domain Enumeration Started!'); // Update notification message
      } catch (err) {
        setNotification("Failed to start enumeration. Please try again later."); // Update notification message
      }
      setIsEnumerating(false);
    };

    const handleFetchResults = async () => {
      try {
        const fetchedSubdomains = await getSubdomains(domain);
        console.log('Fetched Subdomains:', fetchedSubdomains);
        navigate('/domains');
      } catch (err) {
        setNotification("Failed to fetch results.");
      }
    };

    return (
      <Card
        className={cn(styles.card, className)}
        title="Add Asset"
        classTitle="title-green"
        head={
          <Link
              className={cn("button-stroke button-small", styles.button)}
              to="/"
          >
              <Icon name="arrow-left" size="24" />
              <span>Back</span>
          </Link>
        }
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextInput
            className={styles.field}
            label="Domain Name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="aol.com"
            disabled={isEnumerating}
            required
          />
          <div className={styles.buttons}>
            <button className={cn('button', styles.button)} type="submit" disabled={isEnumerating}>
              Add Asset
            </button>
            <button className={cn('button', styles.button)} onClick={handleFetchResults} disabled={isEnumerating}>
              Get Results
            </button>
          </div>
        </form>
        {/* Notification message */}
        {notification && <div className={styles.notification}>{notification}</div>}
      </Card>
    );
};

export default DomainEnumerator;