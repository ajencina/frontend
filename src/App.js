import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import CalendarPage from "./pages/CalendarPage"; 
import TransactionsPage from "./pages/TransactionsPage"; 
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions when the app is mounted
  useEffect(() => {
    axios.get("http://localhost:8080/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Pass transactions data to CalendarPage */}
      <Route path="/calendar" element={<CalendarPage transactions={transactions} />} />
      
      <Route path="/transactions" element={<TransactionsPage />} />
    </Routes>
  );
}

export default App;
