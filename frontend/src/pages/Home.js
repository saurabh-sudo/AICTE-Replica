import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import announcementService from '../services/announcementService';
import './Home.css';

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await announcementService.getAll();
      setAnnouncements(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>All India Council for Technical Education</h1>
          <p>Statutory body for planning and coordinated development of technical education system</p>
        </div>
      </section>

      <div className="container">
        <section className="services">
          <h2>Quick Services</h2>
          <div className="services-grid">
            <Link to="/institutions" className="service-card">
              <h3>Search Institutions</h3>
              <p>Find AICTE approved institutions across India</p>
            </Link>
            <Link to="/verify-student" className="service-card">
              <h3>Verify Student</h3>
              <p>Verify student enrollment and credentials</p>
            </Link>
            <Link to="/grievance" className="service-card">
              <h3>Grievance Portal</h3>
              <p>Submit and track your grievances</p>
            </Link>
            <Link to="/dashboard" className="service-card">
              <h3>Dashboard</h3>
              <p>Access your personalized dashboard</p>
            </Link>
          </div>
        </section>

        <section className="announcements-section">
          <h2>Latest Announcements</h2>
          {loading ? (
            <p className="loading">Loading announcements...</p>
          ) : (
            <div className="announcements-list">
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <div key={announcement.id} className="announcement-card">
                    <div className="announcement-header">
                      <h3>{announcement.title}</h3>
                      <span className={`priority-badge priority-${announcement.priority?.toLowerCase()}`}>
                        {announcement.priority}
                      </span>
                    </div>
                    <p>{announcement.content}</p>
                    <div className="announcement-footer">
                      <span className="category">{announcement.category}</span>
                      <span className="date">
                        {new Date(announcement.publishedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No announcements available</p>
              )}
            </div>
          )}
        </section>

        <section className="info-section">
          <h2>About AICTE</h2>
          <div className="info-content">
            <p>
              The All India Council for Technical Education (AICTE) is the statutory body
              and a national-level council for technical education, under Department of
              Higher Education, Ministry of Education, Government of India.
            </p>
            <p>
              AICTE is responsible for proper planning and coordinated development of the
              technical education and management education system in India.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
