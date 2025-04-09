import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch recent transactions when component mounts
  useEffect(() => {
    axios.get("http://localhost:8080/api/transactions?limit=5")
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
      });
  }, []);

  return (
    <div className="overview-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌍 Budget Tracker</h2>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" className="sidebar-link">📊 Overview</Link></li>
          <li><Link to="/transactions" className="sidebar-link">💳 Transactions</Link></li>
          <li><Link to="/calendar" className="sidebar-link">📅 Calendar</Link></li>
          <li><Link to="/goals" className="sidebar-link">🎯 Goals</Link></li> 
          <li><Link to="/budget" className="sidebar-link">📂 Budget</Link></li> 
          <li><Link to="/accounts" className="sidebar-link">🏦 Accounts</Link></li> 
          <li><Link to="/report" className="sidebar-link">📈 Report</Link></li> 
          <li><Link to="/settings" className="sidebar-link">⚙️ Settings</Link></li>
          <li>🚪 Sign Out</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <h3>Overview</h3>
        </header>

        {/* Top Row */}
        <section className="top-row">
          {/* ... summary / chart / goals */}
        </section>

        {/* Bottom Row */}
        <section className="bottom-row">
          {/* ... budget card */}
          <div className="transactions-card">
            <h4>Transactions</h4>
            <ul className="transactions-list">
              {transactions.length === 0 ? (
                <li style={{ color: "#888", textAlign: "center" }}>
                  No transactions yet. Add one using the + button below!
                </li>
              ) : (
                transactions.map((tx, index) => (
                  <li key={index}>
                    <span>{tx.title || "💸"}</span>
                    <span className={tx.amount >= 0 ? "income" : "expense"}>
                      {tx.amount >= 0 ? `+${tx.amount}` : tx.amount}
                    </span>
                    <span>{new Date(tx.date).toLocaleDateString()}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>

        {/* FAB buttons */}
        <div className="fab-buttons">
          <button className="add-btn">＋</button>
          <button className="minus-btn">－</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
