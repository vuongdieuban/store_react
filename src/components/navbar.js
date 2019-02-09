import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  renderNavLink = () => {
    const links = [
      { label: "Movies", path: "/movies" },
      { label: "Customers", path: "/customers" },
      { label: "Rentals", path: "/rentals" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" }
    ];

    return links.map(link => (
      <li className="nav-item" key={link.path}>
        <NavLink className="nav-link" to={link.path}>
          {link.label}
        </NavLink>
      </li>
    ));
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <i className="fa fa-film" aria-hidden="true" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">{this.renderNavLink()}</ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
