import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true); // state to track auth checking

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get('https://api.noisse.io/portal/user', { withCredentials: true });
=======
        const response = await axios.get('https://noisse-backend-development.up.railway.app/portal/user', { withCredentials: true });
>>>>>>> dev
        console.log('User data:', response.data);
        setUser(response.data.isAuthenticated ? response.data.user : null);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
      setAuthChecking(false); // Auth check complete
    };

    checkAuthStatus();
  }, []);

  if (authChecking) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
