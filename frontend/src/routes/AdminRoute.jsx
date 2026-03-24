// src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600">Authenticating admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "You are not authorized to view the admin panel.",
        }}
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;
