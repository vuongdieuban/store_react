import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveReturn } from "../services/returnService";

class ReturnForm extends Form {
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

  mapToViewModel = rental => {
    return {
      customerEmail: rental.customer.email,
      movieId: rental.movie._id
    };
  };

  populateReturnForm = () => {
    // only allow acces through /rentals and click on return link on rentalsTable.js. Block access from direct /returns
    if (!this.props.location.state)
      return this.props.history.replace("/rentals");

    const { rental } = this.props.location.state;
    let movies = [];
    movies.push(rental.movie);
    this.setState({ movies, data: this.mapToViewModel(rental) });
  };

  doSubmit = async () => {
    try {
      const { rental } = this.props.location.state;
      const returnRental = {
        customerId: rental.customer._id,
        movieId: rental.movie._id
      };
      await saveReturn(returnRental);
      this.props.history.replace("/rentals");
    } catch (ex) {
      const { response } = ex;
      if (
        response &&
        (response.status === 400 ||
          response.status === 404 ||
          response.status === 401)
      ) {
        const errors = { ...this.state.errors };
        errors.customerEmail = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  componentDidMount() {
    this.populateReturnForm();
  }

  render() {
    return (
      <div className="container">
        <h1>Return</h1>
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

export default ReturnForm;
