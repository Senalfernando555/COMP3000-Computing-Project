import React from 'react';
import '../Styles/Footer.css';
import logo from '../Logo.png'; 
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
        <span className="brand-text">Pharma.Supply</span>
        <img src={logo} alt="Pharma.Supply Logo" className="footer-logo" />
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter">
          <p className="newsletter-title">Join our newsletter</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className="Description"> Tracking authenticity from manufacturer to patient—secure, transparent, tamper‑proof.</p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <a href="https://twitter.com/yourhandle" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://facebook.com/yourpage" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com/yourhandle" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/in/yourprofile" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © {year} Pharma.Supply. All rights reserved.
      </div>
    </footer>
  );
}
