import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="page-title">Dashboard</h1>

        <div className="welcome-card card">
          <h2>Welcome, {user.fullName}!</h2>
          <p>Role: {user.role}</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card card">
            <h3>Profile Information</h3>
            <div className="info-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <strong>Role:</strong>
              <span>{user.role}</span>
            </div>
          </div>

          <div className="dashboard-card card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button
                className="action-button"
                onClick={() => navigate('/institutions')}
              >
                Search Institutions
              </button>
              <button
                className="action-button"
                onClick={() => navigate('/verify-student')}
              >
                Verify Student
              </button>
              <button
                className="action-button"
                onClick={() => navigate('/grievance')}
              >
                Submit Grievance
              </button>
            </div>
          </div>

          <div className="dashboard-card card">
            <h3>System Information</h3>
            <div className="info-item">
              <strong>Account Status:</strong>
              <span className="status-active">Active</span>
            </div>
            <div className="info-item">
              <strong>Last Login:</strong>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
