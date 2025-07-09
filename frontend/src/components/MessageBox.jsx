import React from 'react';

const MessageBox = ({ message, type }) => {
  if (!message) return null;

  return (
    <div className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'}`} role="alert">
      {message}
    </div>
  );
};

export default MessageBox;