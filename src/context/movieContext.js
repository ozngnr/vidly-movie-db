import React, { useState, useEffect, createContext } from 'react';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';
import 'react-toastify/dist/ReactToastify.css';

const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [page, setPage] = useState({ currentPage: 1, pageSize: 4 });
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = async (id) => {
    const originalMovies = [...allMovies];

    const movies = allMovies.filter((m) => m._id !== id);
    setAllMovies(movies);

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('This movie has already been deleted.');
      }
      setAllMovies(originalMovies);
    }
  };

  const handleUpdate = (movie) => {
    return movie;
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
    // Get genres and movies from the database
    const fetchData = async () => {
      const { data } = await getGenres();

      const genres = [
        { _id: '5b21ca3eeb7f6fbccd47182s', name: 'All Genres' },
        ...data,
      ];

      const { data: movies } = await getMovies();

      setGenres(genres);
      setAllMovies(movies);
    };

    fetchData();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        allMovies,
        setAllMovies,
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
