import React, { useState, useEffect, createContext } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [page, setPage] = useState({ currentPage: 1, pageSize: 4 });
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id) => {
    const updatedMovies = allMovies.filter((movie) => movie._id !== id);
    setAllMovies(updatedMovies);
  };
  const handlePageChange = (page) => {
    setPage((prevPage) => ({ ...prevPage, currentPage: page }));
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage({ ...page, currentPage: 1 });
  };

  const handleSearch = (genre) => {
    setSelectedGenre('All Genres');
    setPage({ ...page, currentPage: 1 });
    setSearchQuery(genre);
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
        setPage,
        handleDelete,
        handlePageChange,
        handleGenreSelect,
        handleSearch,
        toggleLike,
        selectedGenre,
        setSelectedGenre,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };
