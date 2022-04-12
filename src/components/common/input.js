import React, { useContext } from 'react';
import { FormContext } from './form';

const Input = ({ name, label, type = 'text', ...restProps }) => {
  const { formData, errors, handleChange } = useContext(FormContext);
  const error = errors[name];

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        className="form-control"
        type={type}
        name={name}
        id={name}
        value={formData[name]}
        onChange={handleChange}
        {...restProps}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
