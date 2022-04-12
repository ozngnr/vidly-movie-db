import Joi from 'joi-browser';
import React from 'react';
import Form from './common/form';
import FormButton from './common/formButton';
import Input from './common/input';

const registerSchema = {
  username: Joi.string().email().required().label('Username'),
  password: Joi.string().min(5).required().label('Password'),
  name: Joi.string().required().label('Name'),
};

const RegisterForm = () => {
  const user = { username: '', password: '', name: '' };

  return (
    <div className="form">
      <h1>Register</h1>
      <Form formData={user} schema={registerSchema}>
        <Input type="email" name="username" label="Username" autoFocus />
        <Input type="password" name="password" label="Password" />
        <Input type="text" name="name" label="Name" />
        <FormButton label="Register" />
      </Form>
    </div>
  );
};

export default RegisterForm;
