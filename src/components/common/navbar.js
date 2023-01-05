import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <NavLink className="nav-link" aria-current="page" to="movies">
              Movies
            </NavLink>
            <NavLink className="nav-link" to="customers">
              Customers
            </NavLink>
            <NavLink className="nav-link" to="rentals">
              Rentals
            </NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            {user ? (
              <>
                <NavLink className="nav-link" to="profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="logout">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="register">
                  Register
                </NavLink>
                <NavLink className="nav-link" to="login">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
