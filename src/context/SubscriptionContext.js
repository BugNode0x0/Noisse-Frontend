import React, { createContext, useState, useEffect } from 'react';
import { fetchSubscriptionStatus } from '../api/subdomainAPI';

// Create a Context for Subscription Information
const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const initializeSubscriptionStatus = async () => {
      try {
        const status = await fetchSubscriptionStatus();
        setIsSubscribed(status.isSubscribed); // Ensure you're using the correct property from the response
      } catch (error) {
        console.error('Error initializing subscription status:', error);
        
      }
    };

    initializeSubscriptionStatus();
  }, []);

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setIsSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
