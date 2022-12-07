import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const location = useLocation();

  if (!auth.getCurrentUser()) {
    return <Navigate to={redirectPath} state={location} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
