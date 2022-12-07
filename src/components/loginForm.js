import React, { useState } from 'react';
import Joi from 'joi-browser';

import Input from './common/input';
import Form from './common/form';
import FormButton from './common/formButton';
import auth from '../services/authService';
import { Navigate, useLocation } from 'react-router-dom';

const schema = {
  username: Joi.string().email().min(5).required().label('Username'),
  password: Joi.string().min(8).required().label('Password'),
};

const LoginForm = () => {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const { state } = useLocation();

  const handleSubmit = async () => {
    try {
      const { username, password } = login;
      await auth.login(username, password);
      window.location = state ? state.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response);
        setErrors({
          username: error.response.data,
          password: error.response.data,
        });
      }
    }
    console.log('submitted');
  };

  if (auth.getCurrentUser()) return <Navigate to="/" />;

  return (
    <div className="form">
      <h1>Login</h1>
      <Form
        onSubmit={handleSubmit}
        formData={login}
        setFormData={setLogin}
        errors={errors}
        setErrors={setErrors}
        schema={schema}
      >
        <Input name="username" label="Username" autoFocus />
        <Input type="password" name="password" label="Password" />
        <FormButton label="Login" />
      </Form>
    </div>
  );
};

export default LoginForm;
