import React, { useContext } from 'react';
import Like from './common/like';
import { MovieContext } from '../context/movieContext';
import { Table, TableBody, TableHeader } from './common/table';

const MoviesTable = ({ movies, onSort, sortColumn }) => {
  const { toggleLike, handleDelete } = useContext(MovieContext);

  const columns = [
    { label: 'Title', path: 'title' },
    { label: 'Genre', path: 'genre.name' },
    { label: 'Stock', path: 'numberInStock' },
    { label: 'Rate', path: 'dailyRentalRate' },
    {
      key: 'like',
      content: (movie) => (
        <Like toggleLike={() => toggleLike(movie._id)} liked={movie.liked} />
      ),
    },
    {
      key: 'delete',
      content: (movie) => (
        <button
          onClick={() => handleDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={movies} />
    </Table>
  );
};

export default MoviesTable;
