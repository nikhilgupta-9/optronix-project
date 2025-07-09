import React, { useState, useEffect } from 'react';

const MapPreview = ({ lat, lng }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [lat, lng]);

  if (!lat || !lng) return null;

  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&hl=en`;

  return (
    <div className="mt-3">
      {isLoading ? (
        <div 
          style={{ 
            height: '300px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #dee2e6',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0">Loading map...</p>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      ) : (
        <>
          <iframe
            title="Customer Location Map"
            src={mapUrl}
            width="100%"
            height="300"
            style={{
              border: '1px solid #dee2e6',
              borderRadius: '8px'
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="text-muted small mt-2 text-center">
            Coordinates: {lat}, {lng}
          </div>
        </>
      )}
    </div>
  );
};

export default MapPreview;