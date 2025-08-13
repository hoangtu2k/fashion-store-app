import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@contexts/AuthContext";
import { RequireAuthAdmin, RequireAuthCustomer } from "@contexts/RequireAuth";

import AdminLayout from "@layouts/AdminLayout";
import HomeLayout from "@layouts/HomeLayout";

import Dashboard from "@pages/admin/Dashboard";
import Products from "@pages/admin/Products";
import Orders from "@pages/admin/orders/Orders";
import CreateOrder from "@pages/admin/orders/CreateOrder";
import POS from "@pages/admin/POS";
import Customers from "@pages/admin/Customers";
import Settings from "@pages/admin/Settings";
import Login from "@pages/admin/account/Login";

import Home from "@pages/home/Home";
import Cart from "@pages/home/Cart";
import CheckOut from "@pages/home/CheckOut";
import LoginCustomer from "@pages/home/account/LoginCustomer";
import ProductDetail from "@pages/home/ProductDetail";
import Profile from "@pages/home/account/Profile";
import Address from "@pages/home/account/Addresses";
import Account from "@pages/home/account/Account";
import Register from "@pages/home/account/Register";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route element={<RequireAuthAdmin />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders/list" element={<Orders />} />
              <Route path="/admin/orders/create" element={<CreateOrder />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/pos" element={<POS />} />
            </Route>
          </Route>

          {/* Customer routes */}
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/account/login" element={<LoginCustomer />} />
            <Route path="/account/register" element={<Register />} />
          </Route>

          <Route element={<RequireAuthCustomer />}>
            <Route element={<HomeLayout />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/info" element={<Profile />} />
              <Route path="/account/address" element={<Address />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

