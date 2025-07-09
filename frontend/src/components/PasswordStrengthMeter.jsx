import React from 'react';
import { useEffect, useState } from 'react';

const PasswordStrengthMeter = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback('');
      return;
    }

    // Calculate strength score (0-4)
    let score = 0;
    const feedbackMessages = [];

    // Length check
    if (password.length >= 8) score += 1;
    else feedbackMessages.push('Use at least 8 characters');

    // Contains numbers
    if (/\d/.test(password)) score += 1;
    else feedbackMessages.push('Include numbers');

    // Contains special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else feedbackMessages.push('Add special characters');

    // Contains both lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    else feedbackMessages.push('Use mixed case letters');

    setStrength(score);
    setFeedback(feedbackMessages.join(', '));
  }, [password]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0: return 'bg-danger';
      case 1: return 'bg-danger';
      case 2: return 'bg-warning';
      case 3: return 'bg-info';
      case 4: return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Moderate';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  return (
    <div className="password-strength-meter mt-2">
      <div className="progress" style={{ height: '5px' }}>
        <div
          className={`progress-bar ${getStrengthColor()}`}
          role="progressbar"
          style={{ width: `${(strength / 4) * 100}%` }}
          aria-valuenow={strength}
          aria-valuemin="0"
          aria-valuemax="4"
        ></div>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <small className={`text-muted ${!password ? 'd-none' : ''}`}>
          Strength: <span className="fw-bold">{getStrengthText()}</span>
        </small>
        {feedback && (
          <small className="text-danger">
            <i className="bi bi-exclamation-circle me-1"></i>
            {feedback}
          </small>
        )}
      </div>
      {!password && (
        <small className="text-muted">Password must be at least 6 characters</small>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;