import axios from 'axios';
import React from 'react';
import styles from './Header/User/User.module.sass'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

const LogoutButton = ({ onLogout }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out");
<<<<<<< HEAD
      const response = await axios.get('https://api.noisse.io/portal/logout', { withCredentials: true });
=======
      const response = await axios.get('https://noisse-backend-development.up.railway.app/portal/logout', { withCredentials: true });
>>>>>>> dev
      console.log("Logout response:", response.data);
      setUser(null); // Clear user state
      navigate('/sign-in');
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
