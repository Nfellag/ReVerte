
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
