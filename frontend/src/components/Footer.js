import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About AICTE</h3>
          <p>All India Council for Technical Education</p>
          <p>Statutory body under Department of Higher Education</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/institutions">Institutions</a></li>
            <li><a href="/verify-student">Verify Student</a></li>
            <li><a href="/grievance">Grievance</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@aicte.gov.in</p>
          <p>Phone: 011-29581000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 AICTE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
