import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  console.log("Login component loaded!");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      
      localStorage.setItem("token", response.data.token);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src="/logo.png" alt="Budget Tracker" className="logo-image" />
        <h1 className="title">BUDGET TRACKER</h1>
      </div>

      <div className="login-box">
        <h3>Log in to Budget Tracker</h3>
        <form onSubmit={handleSubmit}>
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
          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-signin">Sign In</button>

          <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </p>

          <button
            type="button"
            className="btn-register"
            onClick={() => navigate("/register")}
          >
            REGISTRATION
          </button>
        </form>

        <p className="switch-form">
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
