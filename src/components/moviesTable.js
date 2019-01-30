import React, { Component } from "react";

class Table extends Component {
  displayMovies = () => {
    return (
      <table className="table">
        {this.displayFields()}
        {this.displayRecords()}
      </table>
    );
  };

  displayFields = () => {
    const fields = ["Name", "Genre", "Stock", "Rate", ""];
    return (
      <thead>
        <tr>
          {fields.map(field => (
            <th scope="col" key={field}>
              {field}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  displayRecords = () => {
    const { movies, onDelete } = this.props;
    return (
      <tbody>
        {movies.length &&
          movies.map(movie => {
            return (
              <tr key={movie._id}>
                <th scope="row">{movie.name}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  render() {
    return this.displayMovies();
  }
}

export default Table;
