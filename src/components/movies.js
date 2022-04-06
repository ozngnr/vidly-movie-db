import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/movieContext';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

const Movies = () => {
  const { movies, genres, handleDelete, toggleLike } = useContext(MovieContext);
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [page, setPage] = useState({ current: 1, size: 4 });
  const { current, size } = page;
  const paginatedMovies = paginate(movies, current, size);

  console.log(paginatedMovies);
  const handlePageChange = (page) => {
    setPage((prevPage) => ({ ...prevPage, current: page }));
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage((prevPage) => ({ ...prevPage, current: 1 }));
  };

  const getPagedMovies = () => {
    const filtered =
      selectedGenre === 'All Genres'
        ? movies
        : movies.filter((m) => m.genre.name === selectedGenre);
    return filtered;
  };

  const data = getPagedMovies();

  if (movies.length === 0) return <p>There are no movies in the database.</p>;

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
        />
      </div>
      <div className="col-9">
        <p>Showing {movies.length} movies in the database.</p>
        <table className="table red">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie) => (
              <tr key={movie._id + 'id'}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    toggleLike={() => toggleLike(movie._id)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={movies.length}
          pageSize={size}
          currentPage={current}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
