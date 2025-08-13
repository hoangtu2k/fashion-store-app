import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [customerUser, setCustomerUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ===== LOAD ADMIN =====
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminUser");

    if (adminToken) {
      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
        setLoading(false);
      } else {
        axios
          .get("/auth/admin/me", {
            headers: { Authorization: `Bearer ${adminToken}` },
          })
          .then((res) => {
            setAdminUser(res.data);
            localStorage.setItem("adminUser", JSON.stringify(res.data));
          })
          .catch(() => {
            setAdminUser(null);
            localStorage.removeItem("adminToken");
          })
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  // ===== LOAD CUSTOMER =====
  useEffect(() => {
    const customerToken = localStorage.getItem("customerToken");
    const storedCustomer = localStorage.getItem("customerUser");
    if (customerToken) {
      if (storedCustomer) {
        setCustomerUser(JSON.parse(storedCustomer));
        setLoading(false);
      } else {
        axios
          .get("/auth/customers/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setCustomerUser(res.data);
            localStorage.setItem("customerUser", JSON.stringify(res.data));
          })
          .catch(() => {
            setCustomerUser(null);
            localStorage.removeItem("customerToken");
          })
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  // ===== ADMIN LOGIN =====
  const loginAdmin = async (username, password) => {
    const res = await axios.post("/auth/admin/login", { username, password });
    localStorage.setItem("adminToken", res.data.token);
    localStorage.setItem("adminUser", JSON.stringify(res.data.user));
    setAdminUser(res.data.user);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdminUser(null);
    navigate("/admin/login");
  };

  // ===== CUSTOMER LOGIN =====
  const loginCustomer = async (username, password) => {
    const res = await axios.post("/auth/customers/login", { username, password });
    localStorage.setItem("customerToken", res.data.token);
    localStorage.setItem("customerUser", JSON.stringify(res.data.user));
    setCustomerUser(res.data.user);
  };

  const logoutCustomer = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerUser");
    setCustomerUser(null);
    navigate("/account/login");
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        customerUser,
        isAdminAuthenticated: !!adminUser,
        isCustomerAuthenticated: !!customerUser,
        loginAdmin,
        logoutAdmin,
        loginCustomer,
        logoutCustomer,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
