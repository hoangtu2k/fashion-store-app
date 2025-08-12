// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Bạn có thể thêm logic lưu token, thông tin user ở đây
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState(false);

  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const loginCustomer = () => setIsCustomerAuthenticated(true);
  const logoutCustomer = () => setIsCustomerAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isCustomerAuthenticated,
        loginCustomer,
        logoutCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
