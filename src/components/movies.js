import React, { useState, useContext } from 'react';
import { MovieContext } from '../context/movieContext';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

const Movies = () => {
  const {
    allMovies,
    genres,
    handleDelete,
    toggleLike,
    selectedGenre,
    setSelectedGenre,
  } = useContext(MovieContext);

  const [page, setPage] = useState({ currentPage: 1, pageSize: 4 });
  const { currentPage, pageSize } = page;

  const handlePageChange = (page) => {
    setPage((prevPage) => ({ ...prevPage, currentPage: page }));
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage((prevPage) => ({ ...prevPage, currentPage: 1 }));
  };

  const getPagedMovies = () => {
    const filtered =
      selectedGenre === 'All Genres'
        ? allMovies
        : allMovies.filter((m) => m.genre.name === selectedGenre);

    const movies = paginate(filtered, currentPage, pageSize);

    return { count: filtered.length, data: movies };
  };

  const { count, data: movies } = getPagedMovies();

  if (count === 0) return <p>There are no movies in the database.</p>;

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
        <p>Showing {count} movies in the database.</p>
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
            {movies.map((movie) => (
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
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
