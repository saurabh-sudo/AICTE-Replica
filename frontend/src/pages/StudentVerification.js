import React, { useState } from 'react';
import studentService from '../services/studentService';
import './StudentVerification.css';

function StudentVerification() {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;

    setLoading(true);
    setSearched(false);
    try {
      const data = await studentService.verify(studentId);
      setResult(data);
      setSearched(true);
    } catch (error) {
      console.error('Error verifying student:', error);
      setResult({ verified: false, message: 'Error verifying student' });
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStudentId('');
    setResult(null);
    setSearched(false);
  };

  return (
    <div className="student-verification">
      <div className="container">
        <h1 className="page-title">Student Verification Portal</h1>

        <div className="verification-section card">
          <p className="description">
            Enter the student ID to verify enrollment and credentials
          </p>
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <label>Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Student'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        {searched && result && (
          <div className={`result-card card ${result.verified ? 'verified' : 'not-verified'}`}>
            <div className="result-header">
              <h2>
                {result.verified ? 'Student Verified' : 'Student Not Found'}
              </h2>
              <span className={`verification-badge ${result.verified ? 'success' : 'failure'}`}>
                {result.verified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
            {result.verified ? (
              <div className="student-details">
                <div className="detail-row">
                  <strong>Student ID:</strong>
                  <span>{result.studentId}</span>
                </div>
                <div className="detail-row">
                  <strong>Name:</strong>
                  <span>{result.name}</span>
                </div>
                <div className="detail-row">
                  <strong>Institution:</strong>
                  <span>{result.institution}</span>
                </div>
                <div className="detail-row">
                  <strong>Course:</strong>
                  <span>{result.course}</span>
                </div>
                <div className="detail-row">
                  <strong>Enrollment Year:</strong>
                  <span>{result.enrollmentYear}</span>
                </div>
              </div>
            ) : (
              <p className="error-message">{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentVerification;
