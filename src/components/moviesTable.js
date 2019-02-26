import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class MovieTable extends Component {
  // define path for _.orderBy in movies.js. The paths are the fields of movie object passed in orderBy
  generateColumns = () => {
    const { user, onDelete } = this.props;
    const columns = [
      {
        label: "Name",
        path: "name",
        content: movie => (
          <Link
            to={{
              pathname: `/movies/${movie._id}`
            }}
          >
            {movie.name}
          </Link>
        )
      },
      { label: "Genre", path: "genre.name" },
      { label: "Stock", path: "numberInStock" },
      { label: "Rate", path: "dailyRentalRate" }
    ];

    if (user && user.isAdmin) {
      columns.push({
        key: "delete",
        content: movie => (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(movie)}
          >
            Delete
          </button>
        )
      });
    }
    return columns;
  };

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.generateColumns()}
      />
    );
  }
}

export default MovieTable;
