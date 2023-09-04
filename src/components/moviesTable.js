import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader } from './common/table';
import Like from './common/like';
import { MovieContext } from '../context/movieContext';
import { updateUser } from '../services/userService';
import { toast } from 'react-toastify';

const MoviesTable = ({ movies, onSort, sortColumn, user }) => {
  const { allMovies, setAllMovies, handleDelete } = useContext(MovieContext);
  const timerRef = useRef();
  const [likedMovies, setLikedMovies] = useState([]);

  const toggleLike = useCallback((id) => {
    if(!user) return toast.warn("Please login to like this movie.");
    
    const movies = [...allMovies];
    const likes = [...likedMovies];
    let updatedMovies, updatedLikes;

      updatedMovies = allMovies.map((movie) => {
        if (movie._id === id) {
          return { ...movie, liked: !movie.liked };
        }
        return movie;
      });
      setAllMovies(updatedMovies);
      const likedMovie = likes.find((movie) => movie === id);
      if (likedMovie) {
        updatedLikes = likedMovies.filter(movie => movie !== id)
        setLikedMovies(updatedLikes);
      } else {
        updatedLikes = [...likes, id]
        setLikedMovies(updatedLikes)
      }

      if(timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      timerRef.current = setTimeout(() => {
        const fetchData = async () => {
          const {data} = await updateUser({...user, likedMovies: updatedLikes})
          console.log(data);
        }
        fetchData().catch(err => {
          console.error(err.message);
          setAllMovies(movies)
          setLikedMovies(likes)
        });
      }, 2000);
  }, [setAllMovies, allMovies, likedMovies, user]);

  useEffect(() => {
    user && setLikedMovies(user.likedMovies);
  }, [user])

  const columns = useMemo(
    () => {
      const baseColumns = [
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
        }
      ]

      if (user && user.isAdmin) {
        baseColumns.push({
          key: 'delete',
          content: (movie) => (
            <button
              onClick={() => handleDelete(movie._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          ),
        })
      }
    return baseColumns
  },
    [toggleLike, user, handleDelete]
  );

  return (
    <Table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={movies} />
    </Table>
  );
};

export default MoviesTable;
