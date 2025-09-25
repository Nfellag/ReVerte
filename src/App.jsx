import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";

// Header
import Header from "./components/Header";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Pages protégées */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/heatmap"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/zones"
            element={
              <ProtectedRoute>
                <h1>Zones</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
