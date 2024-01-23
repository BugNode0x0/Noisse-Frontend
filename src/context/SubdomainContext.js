// src/context/SubdomainContext.js

import React, { useState, createContext, useEffect } from 'react';

// Create the context
export const SubdomainContext = createContext({
  subdomains: [],
  setSubdomains: () => {}
});

// Create a provider component
export const SubdomainProvider = ({ children }) => {
  const [subdomains, setSubdomains] = useState(() => {
    const localData = localStorage.getItem('subdomains');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('subdomains', JSON.stringify(subdomains));
  }, [subdomains]);


return (
  <SubdomainContext.Provider value={{ subdomains, setSubdomains }}>
      {children}
  </SubdomainContext.Provider>
);
};