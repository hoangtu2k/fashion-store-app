// src/contexts/RequireAuth.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAuthAdmin({ isAuthenticated }) {
  if (!isAuthenticated) {
    // Chưa đăng nhập admin, redirect về trang login admin
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />; // render các route con
}

export function RequireAuthCustomer({ isAuthenticated }) {
  if (!isAuthenticated) {
    // Chưa đăng nhập khách hàng, redirect về login khách
    return <Navigate to="/account/login" replace />;
  }
  return <Outlet />;
}
