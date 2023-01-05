import App from './App';
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MovieContextProvider } from './context/movieContext';
import { CustomerContextProvider } from './context/customerContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <MovieContextProvider>
      <CustomerContextProvider>
        <App />
      </CustomerContextProvider>
    </MovieContextProvider>
  </BrowserRouter>
);
