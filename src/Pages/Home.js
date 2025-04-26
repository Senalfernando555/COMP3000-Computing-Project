// src/Pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Pharma Supply Chain DApp</h1>
        <p>Track and verify pharmaceutical products on the blockchain.</p>
      </header>

      <div className="feature-grid">
        <Link to="/register-drug" className="feature-card">
          <h2>Register Drug</h2>
          <p>Manufacturers can register new drugs with unique IDs, manufacture and expiry dates.</p>
        </Link>

        <Link to="/verify-drug" className="feature-card">
          <h2>Verify Drug</h2>
          <p>Check the authenticity of any registered drug by its ID.</p>
        </Link>

        <Link to="/drug-details" className="feature-card">
          <h2>Drug Details</h2>
          <p>View detailed information: manufacturer, dates, owner, authenticity.</p>
        </Link>
      </div>

      <div className="feature-grid2">
        <Link to="/drug-list" className="feature-card">
          <h2>All Drugs</h2>
          <p>See a list of all drugs registered in the system.</p>
        </Link>

        <Link to="/mark-counterfit" className="feature-card">
          <h2>Mark Counterfeit</h2>
          <p>Manufacturers can flag drugs as counterfeit to alert the network.</p>
        </Link>
      </div>

    </div>
  );
}
