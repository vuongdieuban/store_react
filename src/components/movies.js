import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./pagination";

const URL = "http://store.banvuong.com/api/movies";
// const URL = "http://localhost:3001/api/movies";

class Movies extends Component {
  state = {
    movies: [],
    moviesPerPage: 2,
    currentPage: 1
  };

  fetchMovies = async () => {
    const api_call = await fetch(URL);
    const movies = await api_call.json();
    this.setState({ movies });
    console.log(this.state.movies);
  };

  displayMovies = () => {
    const { movies } = this.state;
    if (movies.length === 0) return <p>There are no movies currently</p>;
    return (
      <div className="container">
        <p>There are {movies.length} movies in the Database</p>
        <table className="table">
          {this.displayFields()}
          {this.displayRecords()}
        </table>
      </div>
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
    const movies = this.paginate();
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
                    onClick={() => this.handleDelete(movie)}
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

  handleDelete = movie => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movie._id)
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  paginate = () => {
    const { movies, moviesPerPage, currentPage } = this.state;
    const startIndex = (currentPage - 1) * moviesPerPage;
    const currentMovies = _(movies) // turn movies into lodash wrapper object
      .slice(startIndex)
      .take(moviesPerPage)
      .value(); // convert lodash wrapper object back into normal array
    return currentMovies;
  };

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    const { movies, moviesPerPage, currentPage } = this.state;
    return (
      <React.Fragment>
        {this.displayMovies()}
        <Pagination
          movies={movies}
          moviesPerPage={moviesPerPage}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
