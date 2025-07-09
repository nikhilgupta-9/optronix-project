import React from 'react';
import '../styles/FormSelect.css';

/**
 * Reusable select dropdown component
 * @param {Object} props - Component props
 * @param {string} props.label - Select label
 * @param {string} props.name - Select name attribute
 * @param {string} props.value - Selected value
 * @param {function} props.onChange - Change handler function
 * @param {Array} props.options - Array of option objects {value, label}
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required=false] - Whether the field is required
 * @returns {JSX.Element} Select dropdown with label and options
 */
const FormSelect = ({ label, name, value, onChange, options, error, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label fw-bold">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormSelect;