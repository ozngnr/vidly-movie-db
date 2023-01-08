import React, { useContext } from 'react';
import { FormContext } from './form';

const Select = ({ id, name, label, options }) => {
  const { formData, errors, handleChange } = useContext(FormContext);
  const error = errors[name];

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="form-select form-select-md"
        aria-label=".form-select-lg example"
        value={formData[name]}
        onChange={handleChange}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
