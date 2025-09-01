import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard"; // Landing dashboard (public)
import Login from "./Login";
import Signup from "./Signup";
import PersonalizedDashboard from "./PersonalizedDashboard"; // User-specific dashboard
import ProtectedRoute from "./ProtectedRoute";

// ** NEW **
import Orders from "./Orders";
// ~NEW

function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Dashboard />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected personalized dashboard */}
      <Route
        path="/personalized-dashboard"
        element={
          <ProtectedRoute>
            <PersonalizedDashboard />
          </ProtectedRoute>
        }
      />

      {/* NEW */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown URLs to landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
