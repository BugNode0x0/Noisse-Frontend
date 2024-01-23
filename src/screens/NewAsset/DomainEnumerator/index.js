import React, { useState, useContext } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./DomainEnumerator.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import { enumerateSubdomains, getSubdomains } from '../../../api/subdomainAPI';
import { SubdomainContext } from '../../../context/SubdomainContext';


const DomainEnumerator = ({ className }) => {
    const [domain, setDomain] = useState('');
    const { subdomains, setSubdomains } = useContext(SubdomainContext);
    const [isEnumerating, setIsEnumerating] = useState(false);
    const [notification, setNotification] = useState(''); 

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
        const subdomainStrings = fetchedSubdomains.map(sub => sub.subdomain);
        console.log('Subdomain Strings:', subdomainStrings);
        setSubdomains(subdomainStrings);
        setNotification('Fetched subdomains successfully.'); // Clear notification message
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
        <h4>Subdomains:</h4>
        <ul className={styles.results}>
          {subdomains.map((subdomain, index) => (
            <li key={index}>{subdomain}</li>
          ))}
        </ul>
      </Card>
    );
};

export default DomainEnumerator;