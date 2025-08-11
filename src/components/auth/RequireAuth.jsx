import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAuthAdmin({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}

export function RequireAuthCustomer({ isAuthenticated }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/account/login" />;
}
