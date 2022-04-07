import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/movieContext';

const Movie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  // const { allMovies } = useContext(MovieContext);
  // const movie = allMovies.find((movie) => movie._id === movieId);

  return (
    <div>
      <h1>Movie Form {movieId}</h1>
      <button className="btn btn-primary" onClick={() => navigate('/movies')}>
        Save
      </button>
    </div>
  );
};

export default Movie;
