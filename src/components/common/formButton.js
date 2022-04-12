import React, { useContext } from 'react';
import { FormContext } from './form';

const FormButton = ({ label, onClick }) => {
  const { validate } = useContext(FormContext);
  const isValid = validate();
  // console.log(isValid);

  return (
    <button
      type="submit"
      className="btn btn-primary"
      onClick={onClick}
      disabled={isValid}
    >
      {label}
    </button>
  );
};

export default FormButton;
