import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import User from "./User";

const Header = ({ onOpen }) => {
  const [visible, setVisible] = useState(false);
  const stripePaymentLink = 'https://buy.stripe.com/test_5kA8xf0oN8RycZq000'; // Replace with your actual Stripe payment link

  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()}></button>
      <div className={styles.control} onClick={() => setVisible(false)}>
        <Link className={cn("button", styles.button)} to="/domains/add">
          <Icon name="add" size="24" />
          <span>Start Recon</span>
        </Link>
        <a 
          className={cn("button", styles.button)} 
          href={stripePaymentLink} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Icon name="stripe" size="24" />
          <span>Subscribe - $5/month</span>
        </a>
        <User className={styles.user} />
      </div>
      {/* You can uncomment and use the below code if you have sign-in and sign-up pages */}
      {/* <div className={styles.btns}>
        <Link className={styles.link} to="/sign-in">
          Sign in
        </Link>
        <Link className={cn("button", styles.button)} to="/sign-up">
          Sign up
        </Link>
      </div> */}
    </header>
  );
};

export default Header;
