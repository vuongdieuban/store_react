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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col" />
          </tr>
        </thead>
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
                      onClick={() => {
                        this.setState({
                          movies: this.state.movies.filter(m => m !== movie)
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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
