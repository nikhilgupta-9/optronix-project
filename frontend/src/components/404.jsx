import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSearch } from 'react-icons/fa';
import '../styles/404.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-icon">
          <FaExclamationTriangle size={64} />
        </div>
        <h1 className="error-title">404 - Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="action-buttons">
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            <FaHome /> Go Home
          </button>
          
          <button 
            className="search-button"
            onClick={() => navigate(-1)}
          >
            <FaSearch /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;