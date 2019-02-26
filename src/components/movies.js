import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 3, // number of movies per page
    currentPage: 1,

    genres: [],
    selectedGenre: {},

    sortColumn: { path: "name", order: "asc" },

    searchQuery: ""
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({
      movies
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Movie already been deleted");
      else if (ex.response && ex.response.status === 401)
        alert("Unauthorized! Please Login");

      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelectGenre = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      searchQuery: ""
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

  filterMoviesByGenre = (selectedGenre, movies) => {
    const filteredMovies = selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;
    return filteredMovies;
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    // filter by searchQuery OR by selectedGenre
    let filteredMovies = allMovies;
    if (searchQuery) {
      filteredMovies = allMovies.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = this.filterMoviesByGenre(selectedGenre, allMovies);
    }

    // Sorting movies
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // Movies on each page after filtered and sorted(depends on pageSize)
    const movies = this.paginate(sortedMovies, pageSize, currentPage);
    return { movies, itemCount: filteredMovies.length };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
  };

  async componentDidMount() {
    const movies = await getMovies();
    const data = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  render() {
    const {
      movies: allMovies,
      genres,
      selectedGenre,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    const { user } = this.props;

    const { movies, itemCount } = this.getPagedData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <ListGroup
              data={genres}
              selectedItem={selectedGenre}
              onSelectItem={this.handleSelectGenre}
            />
          </div>

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8">
                {allMovies.length === 0 ? (
                  <p>There are no movies currently</p>
                ) : (
                  <p>There are {allMovies.length} movies in the Database</p>
                )}
              </div>

              <div className="col-md-4">
                <Link to="/movies/new" className="btn btn-primary">
                  New
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <SearchBox
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
                />
              </div>
            </div>

            <div className="row">
              <MovieTable
                movies={movies}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={sortColumn}
                user={user}
              />

              <Pagination
                itemCount={itemCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
