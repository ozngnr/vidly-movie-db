import Joi from 'joi-browser';
import React, { useState } from 'react';
import Form from './common/form';
import FormButton from './common/formButton';
import Input from './common/input';
import { register } from '../services/userService';

const registerSchema = {
  username: Joi.string().email().required().label('Username'),
  password: Joi.string().min(8).required().label('Password'),
  name: Joi.string().min(5).required().label('Name'),
};

const RegisterForm = () => {
  const [user, setUser] = useState({ username: '', password: '', name: '' });
  const [errors, setErrors] = useState({});

  const doSubmit = async () => {
    try {
      const response = await register(user);
      localStorage.setItem('token', response.headers['x-auth-token']);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: error.response.data,
        }));
      }
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <Form
        formData={user}
        setFormData={setUser}
        errors={errors}
        setErrors={setErrors}
        onSubmit={doSubmit}
        schema={registerSchema}
      >
        <Input type="email" name="username" label="Username" autoFocus />
        <Input type="password" name="password" label="Password" />
        <Input type="text" name="name" label="Name" />
        <FormButton label="Register" />
      </Form>
    </div>
  );
};

export default RegisterForm;
