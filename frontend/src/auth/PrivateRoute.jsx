import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from 'auth/AuthContext';

const PrivateRoute = () => {
  const { token, isInitializing } = useAuth();

  if (isInitializing) return <div>Loading auth...</div>;
  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
