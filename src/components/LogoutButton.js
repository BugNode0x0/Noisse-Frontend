// src/components/LogoutButton.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { setAuthToken } = useAuth();

  const handleLogout = () => {
    // Clear the token from localStorage and update auth state
    setAuthToken(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
