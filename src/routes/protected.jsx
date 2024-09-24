import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
  const { userLoggedIn, user } = useSelector((state) => state.login); // Access the user and role

  if (!userLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/vendor-home" />;
  }

  if (!roles.includes(user.role)) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" />;
  }

  // If user is logged in and has the correct role, render the protected component
  return children;
};

export default ProtectedRoute;
