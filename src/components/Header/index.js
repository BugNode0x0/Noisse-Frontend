import React, { useState, useContext } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import User from "./User";
import { createStripeCheckoutSession } from '../../api/subdomainAPI';
import SubscriptionContext from '../../context/SubscriptionContext';

const Header = ({ onOpen }) => {
  const [visible, setVisible] = useState(false);
  const { isSubscribed } = useContext(SubscriptionContext);

  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  const handleStripeCheckout = async () => {
    try {
      const { sessionId } = await createStripeCheckoutSession();
      window.location.href = `${sessionId}`;
    } catch (error) {
      console.error('Error redirecting to Stripe:', error);
    }
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()}></button>
      <div className={styles.control} onClick={() => setVisible(false)}>
        <Link className={cn("button", styles.button)} to="/domains/add">
          <Icon name="add" size="24" />
          <span>Start Recon</span>
        </Link>
        {!isSubscribed && (
          <a 
            className={cn("button", styles.button)} 
            onClick={handleStripeCheckout}
          >
            <Icon name="stripe" size="24" />
            <span>Subscribe - $5/month</span>
          </a>
        )}
        <User className={styles.user} />
      </div>
    </header>
  );
};

export default Header;
