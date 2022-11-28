import React, { createContext } from 'react';
import Joi from 'joi-browser';

export const FormContext = createContext();

const Form = ({
  children,
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit,
  schema,
}) => {
  // Validate Form
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formData, schema, options);
    if (!error) return null;

    const updatedErrors = {};
    error.details.forEach((err) => {
      updatedErrors[err.path] = err.message;
    });
    return updatedErrors;
  };
  // Validate Field on change
  const validateProperty = (name, value, schema) => {
    const updatedErrors = { ...errors };
    const fieldToValidate = { [name]: value };
    const fieldSchema = { [name]: schema[name] };
    const { error } = Joi.validate(fieldToValidate, fieldSchema);

    if (error) {
      updatedErrors[name] = error.details[0].message;
    } else {
      delete updatedErrors[name];
    }
    setErrors(updatedErrors);
  };

  const handleChange = ({ target: input }) => {
    validateProperty(input.name, input.value, schema);

    const updatedData = { ...formData };
    updatedData[input.name] = input.value;
    setFormData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors) {
      setErrors(errors);
      return;
    } else {
      // call the server
      onSubmit();
      console.log('form submited');
    }
  };

  return (
    <FormContext.Provider value={{ formData, errors, handleChange, validate }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;
