import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('https://noisse-backend-production.up.railway.app/portal/user', { withCredentials: true });
        console.log('User data:', response.data);
        setUser(response.data.isAuthenticated ? response.data.user : null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {console.log('Current user:', user)}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
