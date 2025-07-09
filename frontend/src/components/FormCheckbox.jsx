import React from 'react';

/**
 * Reusable checkbox component with terms and conditions style
 * @param {Object} props - Component props
 * @param {string} props.label - Checkbox label
 * @param {string} props.name - Checkbox name attribute
 * @param {boolean} props.checked - Whether checkbox is checked
 * @param {function} props.onChange - Change handler function
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required=false] - Whether the field is required
 * @returns {JSX.Element} Checkbox with label and error message
 */
const FormCheckbox = ({ label, name, checked, onChange, error, required = false }) => {
  return (
    <div className="mb-4">
      <div className="form-check">
        <input
          className={`form-check-input ${error ? 'is-invalid' : ''}`}
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
        />
        <label className="form-check-label" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </div>
    </div>
  );
};

export default FormCheckbox;
