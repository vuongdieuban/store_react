import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import Genres from "./common/listGroup";
import MovieTable from "./moviesTable";

const MOVIES_URL = "http://store.banvuong.com/api/movies";
const GENRES_URL = "http://store.banvuong.com/api/genres";

// const URL = "http://localhost:3001/api/movies";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3, // number of movies per page
    currentPage: 1,

    genres: [],
    selectedGenre: {},

    sortColumn: { path: "name", order: "asc" }
  };

  fetchMovies = async () => {
    const api_call = await fetch(MOVIES_URL);
    const movies = await api_call.json();
    this.setState({ movies });
    console.log(this.state.movies);
  };

  fetchGenres = async () => {
    const api_call = await fetch(GENRES_URL);
    const genres = await api_call.json();
    this.setState({ genres });
    console.log(this.state.genres);
  };

  handleDelete = movie => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movie._id)
    });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectGenre = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  paginate = (movies, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const currentMovies = _(movies) // turn movies into lodash wrapper object
      .slice(startIndex)
      .take(pageSize)
      .value(); // convert lodash wrapper object back into normal array
    return currentMovies;
  };

  filterMovies = (selectedGenre, movies) => {
    const filteredMovies = selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;
    return filteredMovies;
  };

  componentDidMount() {
    this.fetchMovies();
    this.fetchGenres();
  }

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    // filter Movies by selectedGenre
    const filteredMovies = this.filterMovies(selectedGenre, movies);

    // Sorting movies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // Movies on each page (depends on pageSize)
    const moviesPerPage = this.paginate(sortedMovies, pageSize, currentPage);

    return (
      <div className="container">
        {movies.length === 0 ? (
          <p>There are no movies currently</p>
        ) : (
          <p>There are {movies.length} movies in the Database</p>
        )}

        <div className="row">
          <div className="col-md-3">
            <Genres
              data={genres}
              selectedItem={selectedGenre}
              onSelectItem={this.handleSelectGenre}
            />
          </div>

          <div className="col-md-9">
            <MovieTable
              movies={moviesPerPage}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              data={filteredMovies}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
