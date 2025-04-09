import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./TransactionsPage.css";
import TransactionModal from "../components/TransactionModal";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("income");

  const fetchTransactions = () => {
    axios.get("http://localhost:8080/api/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions", err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = (newData) => {
    axios.post("http://localhost:8080/api/transactions", newData)
      .then(() => fetchTransactions())
      .catch((err) => console.error("Error saving transaction", err));
  };

  const grouped = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      weekday: "short",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(tx);
    return acc;
  }, {});

  // ✅ Calculate totals
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);

  const total = (income - Math.abs(expense)).toFixed(2);

  return (
    <div className="overview-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌍 Budget Tracker</h2>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" className="sidebar-link">📊 Overview</Link></li>
          <li><Link to="/transactions" className="sidebar-link">💳 Transactions</Link></li>
          <li>📅 Calendar</li>
          <li>🎯 Goals</li>
          <li>📂 Budget</li>
          <li>🏦 Accounts</li>
          <li>📈 Report</li>
          <li>⚙️ Settings</li>
          <li>🚪 Sign Out</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-toggle">
          <button className="nav-arrow">←</button>
          <h3>March 2025</h3>
          <button className="nav-arrow">→</button>
        </div>

        <div className="toggle-tabs">
          <div className="tab active">Daily</div>
          <div className="tab">Monthly</div>
        </div>

        {/* 🔁 Real-time summary */}
        <div className="monthly-summary-row">
          <span>Income: <span className="income">{income}</span></span>
          <span>Expense: <span className="expense">{expense}</span></span>
          <span>Total: <span className={total >= 0 ? "income" : "expense"}>{total}</span></span>
        </div>

        {/* Grouped transactions */}
        {Object.keys(grouped).length === 0 ? (
          <p className="empty-msg">No transactions yet!</p>
        ) : (
          Object.keys(grouped).map((date) => (
            <div key={date} className="date-group">
              <h4>{date}</h4>
              <ul className="transaction-group">
                {grouped[date].map((tx, idx) => (
                  <li key={idx} className="transaction-item">
                    <span>{tx.title}</span>
                    <span>{tx.method}</span>
                    <span className={tx.amount >= 0 ? "income" : "expense"}>
                      {tx.amount >= 0 ? `+${tx.amount}` : tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}

        {/* FAB buttons */}
        <div className="fab-buttons">
          <button
            className="add-btn"
            onClick={() => {
              setModalType("income");
              setShowModal(true);
            }}
          >
            ＋
          </button>
          <button
            className="minus-btn"
            onClick={() => {
              setModalType("expense");
              setShowModal(true);
            }}
          >
            －
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <TransactionModal
            type={modalType}
            onClose={() => setShowModal(false)}
            onSave={handleAddTransaction}
          />
        )}
      </main>
    </div>
  );
};

export default TransactionsPage;
