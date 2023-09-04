import React, { useState, useEffect, createContext } from 'react';
import { getGenres } from '../services/genreService';
import { deleteMovie, getMovies, saveMovie } from '../services/movieService';
import auth from '../services/authService';
import { toast } from 'react-toastify';

const MovieContext = createContext();
const pageSize = 5;

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

  const handleMovieUpdate = async (movie) => {
    const originalMovies = [...allMovies]

    const updatedMovie = { ...movie };
    updatedMovie.genre = genres.find((g) => g._id === movie.genreId);
    delete updatedMovie.genreId;

    const restMovies = allMovies.filter((m) => m._id !== movie._id);
    setAllMovies([...restMovies, updatedMovie]);

    try {
      await saveMovie(movie)
    } catch (err) {
      console.error(err);
      setAllMovies(originalMovies);
      toast.error("Failed to save movie")
    }
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


  useEffect(() => {
    // Get genres and movies from the database
    setIsLoading(true);
    const user = auth.getCurrentUser();

    const fetchData = async () => {
      try {
        const allPromise = Promise.all([getGenres(), getMovies()]);
        const values = await allPromise

        const genres = [
          { _id: '5b21ca3eeb7f6fbccd47182s', name: 'All Genres' },
          ...values[0].data,
        ];
        const movies = values[1].data.map(movie => {
          if (user && user.likedMovies.includes(movie._id)) {
            return {...movie, liked: true};
          }
          return movie
        })
        setGenres(genres);
        setAllMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
        handleMovieUpdate,
        setCurrentPage,
        handleGenreSelect,
        handleSearch,
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
