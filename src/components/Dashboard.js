import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  return (
    <div className="page-container">
      <h2>Welcome, {username}!</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
