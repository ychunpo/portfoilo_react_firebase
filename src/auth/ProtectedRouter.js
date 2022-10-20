import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './AuthContext';

const ProtectedRouter = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
}

export default ProtectedRouter;