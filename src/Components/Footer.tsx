import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>POPULAR LINKS</h4>
          <ul>
            <li>
              <a href="/catalog">Course Catalog</a>
            </li>
            <li>
              <a href="/guaranteed-to-run">Guaranteed to Run</a>
            </li>
            <li>
              <a href="/special-offers">Special Offers</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/student-services">Student Services</a>
            </li>
            <li>
              <a href="/solutions">Solutions</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li>
              <a href="/company">Company</a>
            </li>
            <li>
              <a href="/news">News</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Skyline ATS Corporate Headquarters</h4>
          <address>
            492 Division Street
            <br />
            Campbell, CA 95008
            <br />
            <a href="tel:+14083701200">408-370-1200</a>
            <br />
            <a href="tel:+18003759546">800-375-9546</a>
          </address>
        </div>

        <div className="footer-section">
          <button className="newsletter-btn">Newsletter Sign-Up</button>
          <h4>Connect With Us</h4>
          <div className="social-media">
            <a href="https://facebook.com">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://twitter.com">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://linkedin.com">
              <i className="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>©2024 Skyline Advanced Technology Services</p>
        <ul>
          <li>
            <a href="/policies">Policies</a>
          </li>
          <li>
            <a href="/privacy">Privacy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
