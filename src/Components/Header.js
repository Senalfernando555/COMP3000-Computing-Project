import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Assuming you have a CSS file for styling

function Header() {
  return (
    <header>
      <nav>
        <ul id="Primary">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register-drug">Register Drug</Link></li>
          {/* <li><Link to="/transfer-ownership">Transfer Ownership</Link></li> */}
          <li><Link to="/verify-drug">Verify Drug</Link></li>
          <li><Link to="/drug-details">Drug Details</Link></li>
          <li><Link to="/mark-counterfit">Mark Counterfit</Link></li>
          <li><Link to="/mark-counterfit">Login/Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
