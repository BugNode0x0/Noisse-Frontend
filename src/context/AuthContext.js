import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: localStorage.getItem('token'), isAuthenticated: false });

  // Call this function when you want to update the auth state globally
  const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, isAuthenticated: !!token });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
