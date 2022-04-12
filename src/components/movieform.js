import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/movieContext';
import Joi from 'joi-browser';

import NotFound from '../components/common/notFound';
import Form from './common/form';
import Input from './common/input';
import FormButton from './common/formButton';
import Select from './common/select';
import { saveMovie } from '../services/fakeMovieService';

const schema = {
  _id: Joi.any(),
  title: Joi.string().required().label('Title'),
  genreId: Joi.string().required().label('Genre'),
  numberInStock: Joi.number()
    .min(0)
    .max(100)
    .required()
    .label('Number In Stock'),
  dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
};

const MovieForm = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { allMovies, genres } = useContext(MovieContext);

  const [movie, setMovie] = useState({
    _id: '',
    title: '',
    genreId: '',
    numberInStock: '',
    dailyRentalRate: '',
  });

  useEffect(() => {
    if (movieId === 'new') return;
    const movie = allMovies.find((m) => m._id === movieId);

    movie &&
      setMovie({
        _id: movie._id,
        title: movie.title,
        genreId: movie.genre._id,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      });
  }, [allMovies, movieId]);

  const handleSubmit = () => {
    saveMovie(movie);
    navigate('/movies');
  };

  return (
    <>
      {movie !== undefined ? (
        <div className="form">
          <h1>{movie.title || 'New Movie'}</h1>
          <Form
            schema={schema}
            onSubmit={handleSubmit}
            formData={movie}
            setFormData={setMovie}
          >
            <Input label="Title" name="title" />
            <Select label="Genre" name="genreId" options={genres.slice(1)} />
            <Input label="Number In Stock" name="numberInStock" type="number" />
            <Input label="Rate" name="dailyRentalRate" />
            <FormButton label="Save" />
          </Form>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default MovieForm;
