// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Ensure the path is correct

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to the sign-in page, but save the current location they were trying to go to
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children; // If the user is authenticated, render the children components
};

export default PrivateRoute;
