import React, { Component } from "react";
const URL = "http://store.banvuong.com/api/movies";
// const URL = "http://localhost:3001/api/movies";

class Movies extends Component {
  state = {
    movies: []
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
    const fields = ["Name", "Genre", "Stock", "Rate", "Action"];
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

  handleDelete = movie => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movie._id)
    });
  };

  displayRecords = () => {
    const { movies } = this.state;
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

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    return this.displayMovies();
  }
}

export default Movies;
