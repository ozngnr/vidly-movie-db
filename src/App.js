import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/common/navbar';
import NotFound from './components/common/notFound';
import Movies from './components/movies';
import MovieForm from './components/movieform';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import Customers from './components/customers';
import RegisterForm from './components/registerForm';
import Rentals from './components/rentals';
import auth from './services/authService';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const user = auth.getCurrentUser();
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
          <Route path="movies" element={<Movies user={user} />} />
          <Route
            path="movies/:movieId"
            element={!user ? <Navigate to="/login" /> : <MovieForm />}
          />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
