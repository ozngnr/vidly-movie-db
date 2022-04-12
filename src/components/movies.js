import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';

import { MovieContext } from '../context/movieContext';
import { paginate } from '../utils/paginate';
import { useSortableData } from '../hooks/useSortableData';
import SearchBar from './common/searchBar';

const Movies = () => {
  const {
    allMovies,
    genres,
    selectedGenre,
    searchQuery,
    handleSearch,
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
    let filtered = sortedMovies;

    if (searchQuery) {
      filtered = sortedMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre !== 'All Genres') {
      filtered = sortedMovies.filter((m) => m.genre.name === selectedGenre);
    }
    // Slice filtered movies to display
    const movies = paginate(filtered, currentPage, pageSize);

    setMoviesCount(filtered.length);
    setMovies(movies);
  }, [sortedMovies, selectedGenre, currentPage, pageSize, searchQuery]);

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
        <Link to="/movies/new" className="btn btn-primary">
          New Movie
        </Link>

        {moviesCount === 0 ? (
          <p style={{ marginTop: '1em' }}>
            There are no movies in the database.
          </p>
        ) : (
          <p style={{ marginTop: '1em' }}>
            Showing {moviesCount} movies in the database.
          </p>
        )}

        <SearchBar value={searchQuery} onChange={handleSearch} />

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
