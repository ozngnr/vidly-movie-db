import React, { useState, useContext, useEffect } from 'react';
import { MovieContext } from '../context/movieContext';
import { useSortableData } from '../hooks/useSortableData';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';

const Movies = () => {
  const {
    allMovies,
    genres,
    selectedGenre,
    handleGenreSelect,
    page,
    handlePageChange,
  } = useContext(MovieContext);

  // Sort movies
  const {
    items: sortedMovies,
    handleSort,
    sortColumn,
  } = useSortableData(allMovies, { path: 'title', order: 'asc' });

  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(sortedMovies.length);

  //Filter movies
  const { currentPage, pageSize } = page;
  useEffect(() => {
    const filtered =
      selectedGenre === 'All Genres'
        ? sortedMovies
        : sortedMovies.filter((m) => m.genre.name === selectedGenre);
    // Slice filtered movies to display
    const movies = paginate(filtered, currentPage, pageSize);

    setMoviesCount(filtered.length);
    setMovies(movies);
  }, [sortedMovies, selectedGenre, currentPage, pageSize]);

  if (moviesCount === 0) return <p>There are no movies in the database.</p>;

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
        <p>Showing {moviesCount} movies in the database.</p>

        <MoviesTable
          movies={movies}
          onSort={handleSort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemsCount={moviesCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
