import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
        username,
      });

      alert(` Account created for ${username}!`);
      navigate("/login"); 
    } catch (error) {
      alert(` Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src="/logo.png" alt="Budget Tracker" className="logo-image" />
        <h1 className="title">BUDGET TRACKER</h1>
      </div>

      <div className="register-box">
        <h3>Registration</h3>
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
          <div className="input-group">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">Sign Up</button>
        </form>
        <p className="switch-form">
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
