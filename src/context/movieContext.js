import React, { useState, useEffect, createContext } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleDelete = (id) => {
    const updatedMovies = movies.filter((movie) => movie._id !== id);
    setMovies(updatedMovies);
  };

  const toggleLike = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie._id === id) {
        return { ...movie, liked: !movie.liked };
      }
      return movie;
    });

    setMovies(updatedMovies);
  };
  useEffect(() => {
    setGenres([
      { _id: '5b21ca3eeb7f6fbccd47182s', name: 'All Genres' },
      ...getGenres(),
    ]);
    setMovies(getMovies());
  }, []);

  return (
    <MovieContext.Provider value={{ movies, genres, handleDelete, toggleLike }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };
