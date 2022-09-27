import React, { useContext } from 'react';
import { FormContext } from './form';

const FormButton = ({ label }) => {
  const { validate } = useContext(FormContext);
  const isValid = validate();

  return (
    <button type="submit" className="btn btn-primary" disabled={isValid}>
      {label}
    </button>
  );
};

export default FormButton;
