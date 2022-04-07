import React, { useState, useEffect, createContext } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, pageSize: 4 });
  const [selectedGenre, setSelectedGenre] = useState('All Genres');

  const handleDelete = (id) => {
    const updatedMovies = allMovies.filter((movie) => movie._id !== id);
    setAllMovies(updatedMovies);
  };
  const handlePageChange = (page) => {
    setPage((prevPage) => ({ ...prevPage, currentPage: page }));
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage((prevPage) => ({ ...prevPage, currentPage: 1 }));
  };

  const toggleLike = (id) => {
    const updatedMovies = allMovies.map((movie) => {
      if (movie._id === id) {
        return { ...movie, liked: !movie.liked };
      }
      return movie;
    });

    setAllMovies(updatedMovies);
  };

  useEffect(() => {
    setGenres([
      { _id: '5b21ca3eeb7f6fbccd47182s', name: 'All Genres' },
      ...getGenres(),
    ]);
    setAllMovies(getMovies());
  }, []);

  return (
    <MovieContext.Provider
      value={{
        allMovies,
        genres,
        page,
        handleDelete,
        handlePageChange,
        handleGenreSelect,
        toggleLike,
        selectedGenre,
        setSelectedGenre,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };
