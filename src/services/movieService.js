import http from './httpService';

const apiEndpoint = '/movies';

const movieUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export const getMovies = () => {
  return http.get(apiEndpoint);
};

export const getMovie = async (movieId) => {
  return await http.get(movieUrl(movieId));
};

export const saveMovie = (movie) => {
  if (movie._id) {
    const updatedMovie = { ...movie };
    delete updatedMovie._id;
    return http.put(movieUrl(movie._id), updatedMovie);
  }

  return http.post(apiEndpoint, movie);
};

export const deleteMovie = (movieId) => {
  return http.delete(movieUrl(movieId));
};
