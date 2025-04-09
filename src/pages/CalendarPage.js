import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths } from "date-fns";
import { Link } from "react-router-dom";
import "./CalendarPage.css";

const CalendarPage = ({ transactions }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Function to generate the days of the current month
  const getDaysInMonth = (month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return eachDayOfInterval({ start, end });
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  // Handle clicking on a date
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Filter transactions for the selected date
  const filteredTransactions = transactions
    ? transactions.filter((tx) => isSameDay(new Date(tx.date), selectedDate))
    : [];

  // Handle next and previous month navigation
  const handleMonthChange = (direction) => {
    const newMonth = addMonths(currentMonth, direction);
    setCurrentMonth(newMonth);
  };

  // Add new income/expense to the calendar (using "+", "-")
  const handleAddTransaction = () => {
    console.log("Add new transaction");
    // Implement functionality to add transaction
  };

  const handleRemoveTransaction = () => {
    console.log("Remove transaction");
    // Implement functionality to remove transaction
  };

  // Get day names (Sun, Mon, etc.)
  const getDayNames = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days;
  };

  const dayNames = getDayNames();

  return (
    <div className="overview-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌍 Budget Tracker</h2>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard" className="sidebar-link">📊 Overview</Link></li>
          <li><Link to="/transactions" className="sidebar-link">💳 Transactions</Link></li>
          <li><Link to="/calendar" className="sidebar-link">📅 Calendar</Link></li>
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
        {/* Calendar Navigation */}
        <div className="calendar-nav">
          <button onClick={() => handleMonthChange(-1)}>←</button>
          <h3>{format(currentMonth, "MMMM yyyy")}</h3>
          <button onClick={() => handleMonthChange(1)}>→</button>
        </div>

        {/* Weekdays Header */}
        <div className="weekdays">
          {dayNames.map((day, index) => (
            <div key={index} className="weekday">{day}</div>
          ))}
        </div>

        {/* Calendar */}
        <div className="calendar-grid">
          {daysInMonth.map((date) => (
            <div
              key={date}
              className={`calendar-day ${isSameDay(date, selectedDate) ? "selected" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <span>{format(date, "d")}</span>
              {transactions && transactions.some((tx) => isSameDay(new Date(tx.date), date)) && (
                <div className="transaction-indicator">•</div>
              )}
            </div>
          ))}
        </div>

        {/* Selected Date Transactions */}
        {selectedDate && (
          <div className="selected-date-info">
            <h4>{format(selectedDate, "iiii, d MMMM yyyy")}</h4>
            <div className="transaction-list-container">
              {filteredTransactions.length > 0 ? (
                <ul className="transaction-list">
                  {filteredTransactions.map((tx, idx) => (
                    <li key={idx}>
                      <span>{tx.title}</span>
                      <span>{tx.method}</span>
                      <span className={tx.amount >= 0 ? "income" : "expense"}>
                        {tx.amount >= 0 ? `+${tx.amount}` : tx.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-transactions-message">
                  <p>No transactions for this date</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAB buttons */}
        <div className="fab-buttons">
          <button className="add-btn" onClick={handleAddTransaction}>＋</button>
          <button className="minus-btn" onClick={handleRemoveTransaction}>－</button>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
