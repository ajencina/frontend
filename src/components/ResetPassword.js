import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      alert("Invalid or expired reset link.");
      navigate("/");
    }
  }, [location, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        token,
        newPassword,
      });

      alert("Password reset successful. Please log in again.");
      navigate("/login");
    } catch (error) {
      alert(`${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src="/logo.png" alt="Budget Tracker" className="logo-image" />
        <h1 className="title">BUDGET TRACKER</h1>
      </div>

      <div className="login-box">
        <h3>Reset Password</h3>
        <form onSubmit={handleReset}>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-signin">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
