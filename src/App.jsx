import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Appointments from "./Pages/Appointments";
import Pandemics from "./Pages/Pandemics";

import Remedies from "./Pages/Remedies";
import Doctors from "./Pages/Doctors";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Default dashboard child route */}
          <Route index element={<Appointments />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="pandemics" element={<Pandemics />} />
          <Route path="remedies" element={<Remedies />} />
          {/* Admin-only Route */}
          <Route
            path="doctors"
            element={
              <RoleBasedRoute roles={["admin"]}>
                <Doctors />
              </RoleBasedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
