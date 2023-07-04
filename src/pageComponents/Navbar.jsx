import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from './Context';

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

// https://api.themoviedb.org/3/genre/movie/list?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { setGenre, genre, setPage, setSearchTerm } = useContext(AppContext);

  const selected = genres.filter((gen) => gen.id === genre);

  function reset() {
    setExpanded(false);
    setGenre('');
    setPage(1);
    setSearchTerm('');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fs-2 fw-bold"
          onClick={() => {
            reset();
          }}
        >
          Movie App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setExpanded(!expanded)}
        >
          <i className={`fas text-dark fa-${expanded ? 'times' : 'bars'}`}></i>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-start ${
            expanded ? 'show' : ''
          }`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink
              to="/"
              className="nav-link"
              aria-current="page"
              onClick={() => {
                reset();
              }}
            >
              Movies
            </NavLink>
            <NavLink
              to="/shows"
              className="nav-link"
              onClick={() => {
                reset();
              }}
            >
              Shows
            </NavLink>
          </div>
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {genre === '' ? 'Genres' : selected[0].name}
            </a>
            <ul className="dropdown-menu">
              <li key={'all'}>
                <a
                  className={`dropdown-item ${genre === '' && 'active'}`}
                  onClick={() => {
                    reset();
                  }}
                >
                  All
                </a>
              </li>
              {genres.map(({ id, name }) => {
                return (
                  <li key={id}>
                    <a
                      className={`dropdown-item ${genre === id && 'active'}`}
                      onClick={() => {
                        setGenre(id);
                        setExpanded(false);
                        setPage(1);
                      }}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
