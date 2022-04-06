import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MovieContextProvider } from './context/movieContext';
import App from './App';
import './index.css';

render(
  <BrowserRouter>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
