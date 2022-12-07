import React, { useContext } from 'react';
import Like from './common/like';
import { MovieContext } from '../context/movieContext';
import { Table, TableBody, TableHeader } from './common/table';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import { useEffect } from 'react';
import { useMemo } from 'react';

const MoviesTable = ({ movies, onSort, sortColumn, user }) => {
  const { toggleLike, handleDelete } = useContext(MovieContext);

  const columns = useMemo(
    () => [
      {
        label: 'Title',
        path: 'title',
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { label: 'Genre', path: 'genre.name' },
      { label: 'Stock', path: 'numberInStock' },
      { label: 'Rate', path: 'dailyRentalRate' },
      {
        key: 'like',
        content: (movie) => (
          <Like toggleLike={() => toggleLike(movie._id)} liked={movie.liked} />
        ),
      },
    ],
    [toggleLike]
  );

  useEffect(() => {
    const user = auth.getCurrentUser();
    const deleteColumn = {
      key: 'delete',
      content: (movie) => (
        <button
          onClick={() => handleDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    };

    if (user && user.isAdmin) {
      columns.push(deleteColumn);
    }
  }, [columns, handleDelete, user]);

  return (
    <Table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={movies} />
    </Table>
  );
};

export default MoviesTable;
