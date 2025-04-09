import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/forgot-password", { email });

      alert("Reset link sent! Please check your email.");
      navigate("/");
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
        <h3>FORGOT PASSWORD</h3>
        <form onSubmit={handleReset}>
          <div className="input-group">
            <span className="icon">📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-signin">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
