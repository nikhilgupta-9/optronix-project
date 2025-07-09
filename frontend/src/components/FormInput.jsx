import React from 'react';
import '../styles/FormInput.css';

const FormInput = ({ label, type, name, value, onChange, required, placeholder }) => (
  <div className="mb-3">
    <label className="form-label fw-semibold">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default FormInput;