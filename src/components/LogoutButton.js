import axios from 'axios';
import React from 'react';
import styles from './Header/User/User.module.sass'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"



const LogoutButton = ({ onLogout }) => {
  const { setUser } = useAuth();
  const navigate = useNavigate(); // Updated for React Router v6

  const handleLogout = async () => {
    try {
      await axios.get('https://noisse-backend-production.up.railway.app/logout', { withCredentials: true });
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
