import * as genresAPI from './fakeGenreService';

const movies = [
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    title: 'Terminator',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishDate: '2018-01-03T19:04:28.809Z',
  },
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    title: 'Die Hard',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 5,
    dailyRentalRate: 2.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    title: 'Get Out',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    title: 'Trip to Italy',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    title: 'Airplane',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    title: 'Wedding Crashers',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    title: 'Gone Girl',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 7,
    dailyRentalRate: 4.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    title: 'The Sixth Sense',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'Thriller' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    title: 'The Avengers',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ipsam saepe magni quos nulla dolore omnis voluptatibus inventore nisi quia, rerum, similique laboriosam ut totam obcaecati nesciunt ipsum. Ipsa, aspernatur!',
    genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'Action' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
