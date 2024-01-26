import axios from 'axios';
import React from 'react';
import styles from './Header/User/User.module.sass'; 



const LogoutButton = ({ onLogout }) => {
  const { setUser } = useAuth();
  const history = useHistory();
  const handleLogout = async () => {
    try {
      // Call backend to clear the session
      await axios.get('https://noisse-backend-production.up.railway.app/logout', { withCredentials: true });
      setUser(null);
      history.push('/sign-in');
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
