// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1 className="app-title">My Splitwise Copy</h1>
      <nav className="nav-buttons">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/summary" className="nav-link">
          Summary
        </Link>
      </nav>
    </header>
  );
};

export default Header;
