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
      // Call backend to clear the session
      await axios.get('https://noisse-backend-production.up.railway.app/logout', { withCredentials: true });
      setUser(null);
      navigate('/sign-in'); // Updated for React Router v6
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
