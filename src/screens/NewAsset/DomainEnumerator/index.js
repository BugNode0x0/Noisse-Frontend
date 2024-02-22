import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./DomainEnumerator.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import { enumerateSubdomains } from '../../../api/subdomainAPI';

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
        setNotification('Enumeration Started!');
        setTimeout(() => {
          navigate('/domains');
        }, 5000); // Adjust timeout as needed
      } catch (err) {
        setNotification("Failed to start enumeration. Please try again later.");
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
            placeholder="Insert your organization's domain name such as 'noisse.io'"
            disabled={isEnumerating}
            required
          />
          <div className={styles.buttons}>
            <button className={cn('button', styles.button)} type="submit" disabled={isEnumerating}>
              {isEnumerating ? (
                <div dangerouslySetInnerHTML={{ __html: `
                  <div style="width:100%;height:0;padding-bottom:100%;position:relative;">
                    <iframe src="https://giphy.com/embed/l3nWhI38IWDofyDrW" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                  </div>
                  <p><a href="https://giphy.com/gifs/thinking-l3nWhI38IWDofyDrW"></a></p>
                ` }} />
              ) : "Add Asset"}
            </button>
          </div>
        </form>
        {notification && <div className={styles.notification}>{notification}</div>}
      </Card>
    );
};

export default DomainEnumerator;
