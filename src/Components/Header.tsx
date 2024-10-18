import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const Header: React.FC = () => {
  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src="/SkylineLogoBlack.png" alt="Skyline Logo" />
          </Link>
        </div>

        <nav>
          <ul className="navbar">
            <li>
              <Link to="/catalog">Catalog</Link>
            </li>
            <li>
              <Link to="/training">Training</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/solutions">Solutions</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Contact Info */}
        <div className="contact-info">
          <a href="mailto:support@skyline-ats.com">Email Us</a>
          <span> | </span>
          <a href="tel:+18003759546">(800) 375-9546</a>
        </div>

        {/* Search Icon */}
        <div className="search-icon">
          <button aria-label="Search">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
