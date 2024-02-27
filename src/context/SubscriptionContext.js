import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchSubscriptionStatus } from '../api/subdomainAPI';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Wrap in useCallback to memoize the function so it can be used in dependencies of useEffect
  const refreshSubscriptionStatus = useCallback(async () => {
    try {
      const status = await fetchSubscriptionStatus();
      setIsSubscribed(status.isSubscribed);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
    }
  }, []);

  useEffect(() => {
    refreshSubscriptionStatus();
  }, [refreshSubscriptionStatus]);

  // Expose refreshSubscriptionStatus method to consumers of the context
  const contextValue = {
    isSubscribed,
    setIsSubscribed,
    refreshSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionContext;
