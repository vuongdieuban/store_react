import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import _ from "lodash";
import { getMovies } from "../services/movieService";
import { saveRental } from "../services/rentalService";
import { getAllCustomers } from "../services/customerService";

class RentalForm extends Form {
  state = {
    data: {
      customerEmail: "",
      movieId: ""
    },
    movies: [],
    errors: {}
  };

  schema = {
    customerEmail: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(5)
      .max(255)
      .required()
      .label("Customer Email"),
    movieId: Joi.string()
      .required()
      .label("Movie")
  };

  mapToViewModel = movie => {
    return {
      customerEmail: "",
      movieId: movie._id
    };
  };

  populateMovies = async () => {
    try {
      // get All movies (show all movies in options)
      let movies = [];
      movies = await getMovies();
      this.setState({ movies, data: this.mapToViewModel(movies[0]) });

      // get the specific movie if come from /movies/:id
      if (this.props.location.state) {
        const { movie } = this.props.location.state;
        this.setState({ data: this.mapToViewModel(movie) });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const customers = await getAllCustomers();
      const customer = customers.find(customer => {
        return customer.email === data.customerEmail;
      });
      if (!customer) {
        throw new Error("Invalid Customer");
      }
      const rental = {
        customerId: customer._id,
        movieId: data.movieId
      };
      await saveRental(rental);
      this.props.history.replace("/rentals");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("Customer or Movie is invalid");
      if (ex.response && ex.response.status === 400)
        alert("Customer or Movie is invalid");
      alert(ex.message);
      this.props.history.replace("/rentals/new");
    }
  };

  async componentDidMount() {
    await this.populateMovies();
  }

  render() {
    return (
      <div className="container">
        <h1>Rental</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormInput(
            "customerEmail",
            "Email",
            "customerEmail@gmail.com",
            "text"
          )}
          {this.renderFormSelect("movieId", "Movie", this.state.movies)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RentalForm;
