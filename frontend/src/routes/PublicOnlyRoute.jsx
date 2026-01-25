import React from 'react'
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getDashboardPath } from '../auth/auth.routes';

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to={getDashboardPath(user.role)} replace/>;
  }
  return children;
}

export default PublicOnlyRoute