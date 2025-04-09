import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {}
      <header className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Budget Tracker" />
          <span>Budget Tracker</span>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <div className="auth-buttons">
          <button onClick={() => navigate("/login")}>Log In</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </header>

      {}
      <main className="hero">
        <img src="/logo.png" alt="Budget Tracker Logo" className="hero-image" />
        <h1 className="main-title">BUDGET TRACKER</h1>
        <h3 className="tagline">Track Smart, Save More!</h3>
        <p className="description">
          Stay on top of your spending and build better financial habits today
        </p>
        <hr className="divider" />

        {}
        <div className="webapp-container">
          <h4>Try the web app</h4>
          <button className="webapp-btn" onClick={() => navigate("/login")}>
            <img src="/logo.png" alt="Web App Icon" />
            Try the <br /> WEB APP
          </button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
