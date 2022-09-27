import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/common/navbar';
import NotFound from './components/common/notFound';
import LoginForm from './components/common/loginForm';

import Movies from './components/movies';
import MovieForm from './components/movieform';
import Customers from './components/customers';
import Rentals from './components/rentals';
import RegisterForm from './components/registerForm';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <NavBar />
      <ToastContainer theme="colored" />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
