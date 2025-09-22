import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import theme from "./theme";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";

// Header
import Header from "./components/Header";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          {/* Redirection par défaut vers le dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Profil */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Pages principales */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/heatmap" element={<h1>Heatmap</h1>} />
          <Route path="/zones" element={<h1>Zones</h1>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
