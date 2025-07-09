
// ✅ File: src/components/LocationButton.jsx
import React from 'react';

const LocationButton = ({ onClick }) => (
  <div className="d-flex gap-2 align-items-center mb-3">
    <button type="button" className="btn btn-outline-primary" onClick={onClick}>
      📍 Get Location
    </button>
  </div>
);

export default LocationButton;