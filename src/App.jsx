import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./components/User/HomePage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageOrders from "./components/Admin/ManageOrders";
import Orders from "./components/User/Orders";
import CartPage from "./components/User/CartPage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }

  if (role && currentUser.role !== role) {
    // Redirect to home if role doesn't match
    return <Navigate to="/" />;
  }

  return element;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Routes visible to all authenticated users */}
        <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin-specific routes */}
        <Route
          path="/admin-dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} role="admin" />}
        />
        <Route
          path="/all-orders"
          element={<ProtectedRoute element={<ManageOrders />} role="admin" />}
        />

        {/* User-specific routes */}
        <Route
          path="/user-orders"
          element={<ProtectedRoute element={<Orders />} role="user" />}
        />
        <Route
          path="/cart"
          element={<ProtectedRoute element={<CartPage />} role="user" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
