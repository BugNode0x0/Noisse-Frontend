import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth status on initial load
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check auth status on initial load
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('https://noisse-backend-production.up.railway.app/portal/user', { withCredentials: true });
        setUser(response.data.isAuthenticated ? response.data.user : null);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
', { withCredentials: true });
        setUser(response.data.isAuthenticated ? response.data.user : null);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
