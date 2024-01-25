import React from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LogoutButton = () => {
  const { setAuthToken } = useAuth();

  const handleLogout = async () => {
    try {
      // Call the backend to clear the cookie
      await axios.get('https://noisse-backend-production.up.railway.app/logout', { withCredentials: true });
      // Clear the token from auth state
      setAuthToken(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
