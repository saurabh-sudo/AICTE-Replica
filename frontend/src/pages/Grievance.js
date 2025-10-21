import React, { useState } from 'react';
import grievanceService from '../services/grievanceService';
import authService from '../services/authService';
import './Grievance.css';

function Grievance() {
  const isAuthenticated = authService.isAuthenticated();
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'MEDIUM',
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Institution Related',
    'Student Verification',
    'Approval Process',
    'Technical Issue',
    'General Query',
    'Others',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError('Please login to submit a grievance');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await grievanceService.create(formData);
      setTicketNumber(response.ticketNumber);
      setSubmitted(true);
      setFormData({
        category: '',
        subject: '',
        description: '',
        priority: 'MEDIUM',
      });
    } catch (err) {
      setError('Failed to submit grievance. Please try again.');
      console.error('Error submitting grievance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTicketNumber('');
    setError('');
  };

  if (submitted) {
    return (
      <div className="grievance-page">
        <div className="container">
          <div className="success-card card">
            <div className="success-icon">✓</div>
            <h2>Grievance Submitted Successfully!</h2>
            <p className="ticket-info">
              Your ticket number is: <strong>{ticketNumber}</strong>
            </p>
            <p>Please save this ticket number for future reference.</p>
            <button className="btn btn-primary" onClick={handleReset}>
              Submit Another Grievance
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grievance-page">
      <div className="container">
        <h1 className="page-title">Grievance Portal</h1>

        {!isAuthenticated && (
          <div className="warning-card card">
            <p>⚠️ Please login to submit a grievance</p>
          </div>
        )}

        <div className="grievance-form-card card">
          <h2>Submit Your Grievance</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief subject of your grievance"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your grievance in detail..."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !isAuthenticated}
            >
              {loading ? 'Submitting...' : 'Submit Grievance'}
            </button>
          </form>
        </div>

        <div className="info-card card">
          <h3>Important Information</h3>
          <ul>
            <li>Please provide accurate and detailed information</li>
            <li>You will receive a ticket number upon submission</li>
            <li>Save the ticket number to track your grievance</li>
            <li>Response time: 3-5 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Grievance;
