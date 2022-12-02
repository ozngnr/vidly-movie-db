import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/movieContext';
import Joi from 'joi-browser';

import Form from './common/form';
import Input from './common/input';
import FormButton from './common/formButton';
import Select from './common/select';
import { saveMovie, getMovie } from '../services/movieService';

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
  const { allMovies, setAllMovies, genres } = useContext(MovieContext);
  const [movie, setMovie] = useState({
    title: '',
    genreId: '',
    numberInStock: '',
    dailyRentalRate: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movieId === 'new') return;

    const fetchData = async () => {
      try {
        const { data: movieInDb } = await getMovie(movieId);
        console.log(movieInDb);

        setMovie({
          _id: movieInDb._id,
          title: movieInDb.title,
          genreId: movieInDb.genre._id,
          numberInStock: movieInDb.numberInStock,
          dailyRentalRate: movieInDb.dailyRentalRate,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate('/not-found');
        }
      }
    };

    fetchData();
  }, [allMovies, movieId, navigate]);

  const handleSubmit = async () => {
    await saveMovie(movie);
    navigate('/movies', { replace: true });
  };

  return (
    <div className="form">
      <h1>{movie.title || 'New Movie'}</h1>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        formData={movie}
        setFormData={setMovie}
        errors={errors}
        setErrors={setErrors}
      >
        <Input label="Title" name="title" />
        <Select label="Genre" name="genreId" options={genres.slice(1)} />
        <Input label="Number In Stock" name="numberInStock" type="number" />
        <Input label="Rate" name="dailyRentalRate" />
        <FormButton label="Save" />
      </Form>
    </div>
  );
};

export default MovieForm;
