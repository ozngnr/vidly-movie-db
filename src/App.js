import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import jwtDecode from 'jwt-decode';
import NavBar from './components/common/navbar';
import NotFound from './components/common/notFound';
import Movies from './components/movies';
import MovieForm from './components/movieform';
import LoginForm from './components/loginForm';
import Customers from './components/customers';
import RegisterForm from './components/registerForm';
import Rentals from './components/rentals';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [user, setUser] = useState();
  console.log('app rendered');
  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      console.log(user);
      setUser(user);
    } catch (error) {}
  }, []);

  return (
    <>
      <NavBar user={user} />
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
