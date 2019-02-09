import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

const GENRES_URL = "http://store.banvuong.com/api/genres";
const MOVIE_URL = "http://store.banvuong.com/api/movies/";

class MovieForm extends Form {
  state = {
    data: {
      name: "",
      genreId: "",
      numberInStock: 0,
      dailyRentalRate: 0
    },
    genres: [],
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(5)
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  fetchGenres = async () => {
    const api_call = await fetch(GENRES_URL);
    const genres = await api_call.json();
    console.log("genres fetched\n", genres);
    return genres;
  };

  fetchMovie = async movieId => {
    const api_call = await fetch(MOVIE_URL + movieId);
    const movie = await api_call.json();
    console.log("Movie fetched\n", movie);
    return movie;
  };

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      name: movie.name,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  async componentDidMount() {
    const genres = await this.fetchGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    try {
      const movie = await this.fetchMovie(movieId);
      // if movie not found redirect to /not-found
      if (!movie) return this.props.history.replace("/not-found");
      this.setState({ data: this.mapToViewModel(movie) });
    } catch {
      return this.props.history.replace("/not-found");
    }
  }

  doSubmit = () => {
    // call backend service to post movie
    console.log("submitted");
    // redirect back to /movies
    this.props.history.replace("/movies");
  };

  render() {
    return (
      <div className="container">
        <h1>Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormInput("name", "Title", "Movie Title", "text")}
          {this.renderFormSelect("genreId", "Genre", this.state.genres)}
          {this.renderFormInput("numberInStock", "In Stock", "10", "number")}
          {this.renderFormInput(
            "dailyRentalRate",
            "Daily Rental Rate",
            "2.5",
            "number"
          )}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
