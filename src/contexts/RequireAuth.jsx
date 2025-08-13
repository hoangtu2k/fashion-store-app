import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RequireAuthAdmin = () => {
  const { isAdminAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export const RequireAuthCustomer = () => {
  const { isCustomerAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isCustomerAuthenticated ? <Outlet /> : <Navigate to="/account/login" />;
};
