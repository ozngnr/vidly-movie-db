import React from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Form from '../common/form';
import FormButton from './formButton';

const schema = {
  username: Joi.string().alphanum().required().label('Username'),
  password: Joi.string().required().label('Password'),
};

const LoginForm = () => {
  const login = { username: '', password: '' };
  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} formData={login} schema={schema}>
        <Input name="username" label="Username" autoFocus />
        <Input type="password" name="password" label="Password" />
        <FormButton label="Login" />
      </Form>
    </div>
  );
};

export default LoginForm;
