import React, { useState, useEffect, createContext } from 'react';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies } from '../services/movieService';

const MovieContext = createContext();
const pageSize = 4;

const MovieContextProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleMovieUpdate = (movie) => {
    // const updatedMovie = { ...movie };
    // updatedMovie.genre = genres.find((g) => g._id === updatedMovie.genreId);
    // delete updatedMovie.genreId;

    // const restMovies = allMovies.filter((m) => m._id !== updatedMovie._id);
    // setAllMovies([...restMovies, updatedMovie]);
    return movie;
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSearch = (genre) => {
    setSelectedGenre('All Genres');
    setCurrentPage(1);
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
      setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  return (
    <MovieContext.Provider
      value={{
        allMovies,
        setAllMovies,
        genres,
        currentPage,
        pageSize,
        handleDelete,
        setCurrentPage,
        handleGenreSelect,
        handleSearch,
        toggleLike,
        selectedGenre,
        setSelectedGenre,
        searchQuery,
        setSearchQuery,
        isLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContextProvider, MovieContext };
