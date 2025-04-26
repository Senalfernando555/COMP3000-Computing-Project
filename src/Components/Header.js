import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css"; 

function Header() {
  return (
    <header>
      <link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png" />
      <nav>
        <ul id="Primary">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/register-drug">Register Drug</Link></li>
          <li><Link to="/verify-drug">Verify Drug</Link></li>
          <li><Link to="/drug-details">Drug Details</Link></li>
          <li><Link to="/mark-counterfit">Mark Counterfit</Link></li>
          <li><Link to="/drug-list">Drug List</Link></li>
          <li><Link to="/">Login/Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
