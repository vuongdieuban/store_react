import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getOneMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  // state.data does not contain _id, when create a movie, the backend will assign the _id
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

  // Schema contains _id is optional (for when receive already existed movie)
  schema = {
    _id: Joi.string(),
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

  // only extract nesscessary info (ie: exclude property like __v,)
  mapToViewModel = movie => {
    return {
      _id: movie._id,
      name: movie.name,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      /** if come directly to /movies/new, set default genre to the first genre. Otherwise, if come from
       * /movies/:id then populate the form based on that specific movie
       */
      if (movieId === "new") {
        // genres is available because we populate genres first
        console.log(movieId);
        const { genres, data } = this.state;
        let defaultData = { ...data };
        defaultData.genreId = genres[0]._id;
        this.setState({ data: defaultData });
        return;
      }

      // if movie not found or any expected error occurs, axios interceptor from httpService will be triggered and return a Promise.reject(error) => go to catch block
      const movie = await getOneMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  doSubmit = async () => {
    try {
      // call backend service to post/put movie
      await saveMovie(this.state.data);
      console.log("Movie Submitted");
      this.props.history.replace("/movies");
    } catch (ex) {
      if (ex.response && ex.response.status === 401)
        alert("Unauthorized! Please Login");

      // redirect back to /movies
      this.props.history.replace("/movies");
    }
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
          <div className="row">
            <div className="col col-sm-1">{this.renderButton("Save")}</div>
            {this.props.match.params.id === "new" ? null : (
              <div className="col col-sm-1">
                <Link
                  to={{
                    pathname: "/rentals/new",
                    state: { movie: this.state.data }
                  }}
                  className="btn btn-primary"
                >
                  Rent
                </Link>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default MovieForm;
