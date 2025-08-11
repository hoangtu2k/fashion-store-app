import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import HomeLayout from './layouts/HomeLayout';

import Dashboard from '@pages/Dashboard';
import Products from '@pages/Products';
import Orders from '@pages/orders/Orders';
import CreateOrder from '@pages/orders/CreateOrder';
import POS from '@pages/POS';
import Customers from '@pages/Customers';
import Settings from '@pages/Settings';
import Login from '@pages/account/Login';

import Home from '@pages/home/Home';
import Cart from '@pages/home/Cart';
import CheckOut from '@pages/home/CheckOut';
import LoginCustomer from '@pages/home/account/Login';
import ProductDetail from '@pages/home/ProductDetail';
import Profile from '@pages/home/account/Profile';
import Address from '@pages/home/account/Addresses';
import Account from '@pages/home/account/Account';

export default function App() {
  const isAuthenticated = true; // mock

  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin/login" />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders/list" element={<Orders />} />
          <Route path="/admin/orders/create" element={<CreateOrder />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>

        {/* POS route riêng */}
        <Route path="/pos" element={<POS />} />

        {/* Home routes */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/account" element={<Account />} />
          <Route path="/account/info" element={<Profile />} />
          <Route path="/account/address" element={<Address />} />

          <Route path="/account/login" element={<LoginCustomer />} />
        </Route>

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
