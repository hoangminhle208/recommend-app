import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav  className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          Recomend Movie App
        </NavLink>
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/search-movie"}>
                Search movie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/get-recs-for-user"}>
                Take recommend movie for user
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/get-visualize-movie"}>
                Data Visualization
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
