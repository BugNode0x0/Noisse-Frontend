import axios from 'axios';
import React from 'react';
import styles from './Header/User/User.module.sass'; // Update this path to the correct location of your User.module.sass file

const LogoutButton = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      // Call the backend to clear the cookie
      await axios.get('https://noisse-backend-production.up.railway.app/logout', { withCredentials: true });
      onLogout(); // Close the user menu and clear local state
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button className={styles.item} onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
