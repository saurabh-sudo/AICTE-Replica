import React, { useState, useEffect } from 'react';
import institutionService from '../services/institutionService';
import './InstitutionSearch.css';

function InstitutionSearch() {
  const [institutions, setInstitutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    fetchApprovedInstitutions();
  }, []);

  const fetchApprovedInstitutions = async () => {
    setLoading(true);
    try {
      const data = await institutionService.getApproved();
      setInstitutions(data);
    } catch (error) {
      console.error('Error fetching institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchApprovedInstitutions();
      return;
    }

    setLoading(true);
    setShowAll(false);
    try {
      let data;
      if (searchType === 'name') {
        data = await institutionService.searchByName(searchTerm);
      } else if (searchType === 'state') {
        data = await institutionService.searchByState(searchTerm);
      }
      setInstitutions(data);
    } catch (error) {
      console.error('Error searching institutions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setShowAll(true);
    fetchApprovedInstitutions();
  };

  return (
    <div className="institution-search">
      <div className="container">
        <h1 className="page-title">Search AICTE Approved Institutions</h1>

        <div className="search-section card">
          <form onSubmit={handleSearch}>
            <div className="search-controls">
              <div className="form-group">
                <label>Search By</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="name">Institution Name</option>
                  <option value="state">State</option>
                </select>
              </div>
              <div className="form-group search-input-group">
                <label>Search Term</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Enter ${searchType}...`}
                />
              </div>
              <div className="search-buttons">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {loading ? (
          <div className="loading">Loading institutions...</div>
        ) : (
          <div className="results-section">
            <h2>
              {showAll ? 'All Approved Institutions' : 'Search Results'}{' '}
              ({institutions.length})
            </h2>
            {institutions.length > 0 ? (
              <div className="institutions-grid">
                {institutions.map((institution) => (
                  <div key={institution.id} className="institution-card card">
                    <h3>{institution.institutionName}</h3>
                    <div className="institution-details">
                      <p>
                        <strong>Code:</strong> {institution.institutionCode}
                      </p>
                      <p>
                        <strong>Type:</strong> {institution.institutionType}
                      </p>
                      <p>
                        <strong>Location:</strong> {institution.city}, {institution.state}
                      </p>
                      <p>
                        <strong>Status:</strong>{' '}
                        <span className="status-badge status-approved">
                          {institution.approvalStatus}
                        </span>
                      </p>
                      {institution.affiliation && (
                        <p>
                          <strong>Affiliation:</strong> {institution.affiliation}
                        </p>
                      )}
                      {institution.website && (
                        <p>
                          <strong>Website:</strong>{' '}
                          <a
                            href={institution.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {institution.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-results">No institutions found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstitutionSearch;
