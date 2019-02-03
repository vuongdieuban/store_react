import React, { Component } from "react";
import Table from "./common/table";

class MovieTable extends Component {
  // define path for _.orderBy in movies.js. The paths are the fields of movie object passed in orderBy
  columns = [
    { label: "Name", path: "name" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
      />
    );
  }
}

export default MovieTable;
